import { DataSource, Repository } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskToEmployeeDto } from 'src/task-employee/dto/create-task-to-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResponseDto } from 'src/common/response/dto/response.dto';

@Injectable()
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(dataSource: DataSource) {
    super(EmployeeEntity, dataSource.createEntityManager());
  }

  async findAllEmployee(user: UserEntity): Promise<EmployeeEntity[]> {
    const sql = this.query(`
      select e.id, e.name, e.role, e.email, e.phone,
      count(t.status)::integer as "totalTasks",
      count(*) filter (where t.status = 'IN_PROGRESS')::integer AS "tasksInprogress",
      count(*) filter (where t.status = 'DONE')::integer AS "tasksDone",
      count(*) filter (where t.status = 'OPEN')::integer AS "tasksOpen"
      from employee e 
      left join "taskEmployee" te ON e.id = te."employeeId" 
      left join task t on te."taskId" = t.id 
      where e."userId" = '${user.id}'
      group by e.id`);
    return sql;
  }

  async findOneEmployee(id: string): Promise<EmployeeEntity> {
    const [sql] = await this.query(`
      SELECT 
        e.id, 
        e."name", 
        e."role", 
        e.email, 
        e.phone,
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', t.id,
                    'title', t.title,
                    'description', t.description,
                    'status', t.status,
                    'createdAt', t."createdAt",
                    'expectedToFinish', t."expectedToFinish",
                    'alreadyFinished', t."alreadyFinished"
                )
            ) FILTER (WHERE t.id IS NOT NULL), '[]'::json
        ) AS tasks
      FROM employee e
      LEFT JOIN "taskEmployee" te ON e.id = te."employeeId" 
      LEFT JOIN task t ON te."taskId" = t.id 
      WHERE e.id = '${id}'
      GROUP BY e.id;
    `);
    return sql;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    user: UserEntity,
  ): Promise<EmployeeEntity> {
    const { name, email, phone, role } = createEmployeeDto;
    const employee = this.create({
      name,
      email,
      phone,
      role,
      userId: user.id,
    });
    const storeEmployee = await this.save(employee);
    return storeEmployee;
  }

  async updateEmployee(
    employee: ResponseDto<EmployeeEntity>,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const assignEmployee = Object.assign(employee.data, updateEmployeeDto);
    const storeEmployee = await this.save(assignEmployee);
    return storeEmployee;
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.delete(id);
    return;
  }
}
