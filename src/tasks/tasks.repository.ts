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
      STRING_AGG(s."id"::text, E'\n') as "stockpileId",
      STRING_AGG(s."name"::text, E'\n') AS "stockpileName", 
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
    WHERE t."userId" = '591af291-73af-4673-9bbb-c4377e6a5598'
    GROUP BY t."id";
   `);
    return tasks;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    return;
  }

  async findOneTask(id: string): Promise<TaskEntity> {
    const sql = await this.query(`
      select e.id as "employeeId", e.name as "employeeName", e.email as "employeeEmail", t.title as "taskTile",
      t.description as "taskDescription", t.status as "taskStatus", t."createdAt" as "taskCreatedAt",
      t."expectedToFinish" as "taskExpectedToFinish", t."alreadyFinished" as "taskAlreadyFinished", s.id as "stockpileId",
      s."name" as "stockpileName", s.quant as "stockpileQuant", s.description as "stockpileDescription"
      from task t
      full join "taskEmployee" te 
      on te."taskId" = t.id
      full join employee e
      on e.id = te."employeeId"
      full join stockpile s 
      on s."taskId" = t.id 
      where t.id = '${id}'
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
