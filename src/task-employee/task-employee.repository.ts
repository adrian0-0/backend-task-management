import { DataSource, In, Repository } from 'typeorm';
import { TaskEmployeeEntity } from './entities/task-employee.entity';
import { CreateTaskToEmployeeDto } from './dto/create-task-to-employee.dto';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TaskEmployeeRepository extends Repository<TaskEmployeeEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEmployeeEntity, dataSource.createEntityManager());
  }

  async attachEmployeesToTask(id: string, employeeId: string[]): Promise<void> {
    const values = employeeId
      .map((employeeId) => `('${id}', '${employeeId}')`)
      .join(', ');

    await this.query(`
      insert into "taskEmployee" ("taskId", "employeeId")
      values ${values}
      on conflict ("taskId", "employeeId")
      do update set "taskId" = excluded."taskId"`);
  }

  async attachTaskstoEmployee(id: string, taskId: string[]): Promise<void> {
    const values = taskId.map((taskId) => `('${id}', '${taskId}')`).join(', ');

    await this.query(`
    insert into "taskEmployee" ("employeeId", "taskId")
    values ${values}
    on conflict ("taskId", "employeeId")
    do update set "employeeId" = excluded."employeeId"`);
  }

  async removeEmployeeFromTask(
    taskId: string,
    employeeId: string,
  ): Promise<void> {
    await this.delete({ taskId, employeeId });
  }
}
