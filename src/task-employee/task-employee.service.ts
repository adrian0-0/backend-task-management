import {
  ConflictException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskToEmployeeDto } from './dto/create-task-to-employee.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { TaskEmployeeRepository } from './task-employee.repository';
import { TasksService } from 'src/tasks/tasks.service';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { In } from 'typeorm';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class TaskEmployeeService {
  constructor(
    private readonly taskService: TasksService,
    private readonly employeeService: EmployeeService,
    private readonly taskEmployeeRepository: TaskEmployeeRepository,
  ) {}

  async updateEmployeesToTask(
    id: string,
    employeeId: string[],
    user: UserEntity,
  ): Promise<void> {
    await this.taskService.verifyId(id, user.id);
    const employee = await this.taskEmployeeRepository.find({
      where: { employeeId: In(employeeId) },
    });

    const mapDuplicatedValues = employee.map((employee) => employee.employeeId);
    // const filterDuplicatedEmployee = employeeId.filter(
    //   (employeeId) => !mapDuplicatedValues.includes(employeeId),
    // );

    // if (filterDuplicatedEmployee.length === 0) {
    //   throw new ConflictException(
    //     `This task with Id ${id} is already assigned for Employee Id ${employeeId}`,
    //   );
    // }

    return this.taskEmployeeRepository.updateEmployeesToTask(
      id,
      mapDuplicatedValues,
    );
  }

  async attachEmployeesToTask(
    id: string,
    employeeId: string[],
    user: UserEntity,
  ): Promise<void> {
    await this.taskService.verifyId(id, user.id);
    const employee = await this.taskEmployeeRepository.find({
      where: { employeeId: In(employeeId) },
    });

    // const mapDuplicatedValues = employee.map((employee) => employee.employeeId);
    // const filterDuplicatedEmployee = employeeId.filter(
    //   (employeeId) => !mapDuplicatedValues.includes(employeeId),
    // );

    // if (filterDuplicatedEmployee.length === 0) {
    //   throw new ConflictException(
    //     `This task with Id ${id} is already assigned for Employee Id ${employeeId}`,
    //   );
    // }

    return await this.taskEmployeeRepository.attachEmployeesToTask(
      id,
      employeeId,
    );
  }

  async attachTaskstoEmployee(id: string, taskId: string[], user: UserEntity) {
    await this.employeeService.verifyId(id, user);
    const task = await this.taskEmployeeRepository.find({
      where: { taskId: In(taskId) },
    });

    // const mapTaskId = task.map((task) => task.taskId);
    // const filterDuplicatedTask = taskId.filter(
    //   (taskId) => !mapTaskId.includes(taskId),
    // );

    // if (filterDuplicatedTask.length === 0) {
    //   throw new ConflictException(
    //     `This Employee with Id ${id} is already assigned for Task Id ${taskId}`,
    //   );
    // }

    return await this.taskEmployeeRepository.attachTaskstoEmployee(id, taskId);
  }
}
