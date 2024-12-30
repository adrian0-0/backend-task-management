import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UpdateTasksStatusDto } from './dto/update-task-status.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { throwDeprecation } from 'process';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasks(filterDto: GetStatusFilterDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const findOneTask = await this.taskRepository.findOneBy({
      id,
    });
    if (!findOneTask)
      throw new NotFoundException(`Task with ID "${id}" not found`);
    return findOneTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const findTask = await this.getTaskById(id);

    if (!findTask) {
      return;
    }
    return this.taskRepository.deleteTask(id);
  }

  async updateTaskStatus(id: string, status: Status): Promise<TaskEntity> {
    const findTask = await this.getTaskById(id);
    if (!findTask) {
      return;
    }
    findTask.status = status;

    await this.taskRepository.save(findTask);
  }
  // updateTaskStatusById(id: string, status: Status): ITasks {
  //   const task = this.validateTaskIdExistance(id);
  //   task.status = status;
  //   return task;
  // }
}
