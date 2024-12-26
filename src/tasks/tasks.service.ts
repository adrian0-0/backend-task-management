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

  // findOneTask(id: string) {
  //   return this.tasks.find((task) => task.id === id);
  // }
  // getAllTasks(): ITasks[] {
  //   return this.tasks;
  // }
  // validateTaskIdExistance(id: string): ITasks {
  //   if (!this.findOneTask(id)) {
  //     throw new NotFoundException(`Task with ID: ${id} not found`);
  //   }
  //   return this.findOneTask(id);
  // }
  // getTasksWithFilter(filterDto: GetStatusFilterDto): ITasks[] {
  //   const { status, search } = filterDto;
  //   console.log(filterDto);
  //   let allTasks = this.getAllTasks();
  //   if (status) {
  //     allTasks = allTasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     allTasks = allTasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return allTasks;
  // }
  async getTaskById(id: string): Promise<TaskEntity> {
    console.log(this.taskRepository);
    const findOneTask = await this.taskRepository.findOneBy({
      id,
    });
    if (!findOneTask) throw new NotFoundException('Task not found');
    return findOneTask;
  }
  // getTaskById(id: string): ITasks {
  //   return this.validateTaskIdExistance(id);
  // }
  // deleteTaskById(id: string): void {
  //   this.validateTaskIdExistance(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  // updateTaskStatusById(id: string, status: Status): ITasks {
  //   const task = this.validateTaskIdExistance(id);
  //   task.status = status;
  //   return task;
  // }
  // createTasks(createTaskDto: CreateTaskDto): ITasks {
  //   const { title, description } = createTaskDto;
  //   const createTask: ITasks = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: Status.OPEN,
  //   };
  //   this.tasks.push(createTask);
  //   return createTask;
  // }
}
