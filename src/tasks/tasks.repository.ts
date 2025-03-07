import { TaskEntity } from './entities/task.entity';
import { Repository, DataSource, Brackets } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Status } from './task-status.enum';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UserEntity } from '../user/entities/user.entity';
import { compare } from 'bcrypt';
import { CreateTaskToEmployeeDto } from '../task-employee/dto/create-task-to-employee.dto';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async getTasks(
    filterDto: GetStatusFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const { id } = user;
    const query = this.createQueryBuilder('status');

    if (status) {
      query.andWhere('status = :status', { status });
    }
    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('title ILIKE :search OR description ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    const tasks = await this.query(`
    SELECT 
      t."id", 
      t."title", 
      s."id" as "stockpileId",
      s."name" AS "stockpileName", 
      STRING_AGG(e."id"::text, E'\n') AS "employeeId",
      STRING_AGG(e."name", E'\n') AS "employeeName",
      t."description",
      t."status", 
      t."createdAt", 
      t."expectedToFinish", 
      t."alreadyFinished"
    FROM task t 
    LEFT JOIN stockpile s ON t.id = s."taskId"
    LEFT JOIN "taskEmployee" te ON t.id = te."taskId" 
    LEFT JOIN employee e ON te."employeeId" = e."id"  
    WHERE t."userId" = '${id}'
    GROUP BY t."id";
   `);
    return tasks;
  }

  async findOneTask(id: string): Promise<TaskEntity> {
    const [sql] = await this.query(`
    select     
        t.title, 
        t.description, 
        t.status, 
        t."createdAt", 
        t."expectedToFinish", 
        t."alreadyFinished",
        s.id as "stockpileId", 
        s.name as "stockpileName",
        s.quant as "stockpileQuant", 
        s.description as "stockpileDescription",
        coalesce (
            json_agg(
                jsonb_build_object(
                    'id', e.id,
                    'name', e.name,
                    'role', e.role,
                    'email', e.email,
                    'phone', e.phone
                )
            ) filter (where e.id is not null), '[]'::json
        ) as employees 
    from task t
    left join "taskEmployee" te on t.id = te."taskId"
    left join employee e on te."employeeId" = e.id 
    left join stockpile s on t.id = s."taskId" 
    where t.id = '${id}'
    group by t.id, s."id"
    `);
    return sql;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description, createdAt, expectedToFinish, alreadyFinished } =
      createTaskDto;
    const task = this.create({
      title,
      description,
      status: Status.OPEN,
      createdAt,
      expectedToFinish,
      alreadyFinished,
      userId: user.id,
    });
    const storeTask = await this.save(task);
    return storeTask;
  }
  async deleteTask(id: string): Promise<void> {
    await this.delete({ id });
  }
}
