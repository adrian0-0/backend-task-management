import { Injectable, NotFoundException } from '@nestjs/common';
import { ITasks, Status } from './task.model';
import { v7 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/task.dto';
import { title } from 'process';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UpdateTasksStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  private tasks: ITasks[] = [];

  findOneTask(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  getAllTasks(): ITasks[] {
    return this.tasks;
  }

  validateTaskIdExistance(id: string): ITasks {
    if (!this.findOneTask(id)) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
    return this.findOneTask(id);
  }

  getTasksWithFilter(filterDto: GetStatusFilterDto): ITasks[] {
    const { status, search } = filterDto;
    console.log(filterDto);

    let allTasks = this.getAllTasks();

    if (status) {
      allTasks = allTasks.filter((task) => task.status === status);
    }

    if (search) {
      allTasks = allTasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return allTasks;
  }

  getTaskById(id: string): ITasks {
    return this.validateTaskIdExistance(id);
  }

  deleteTaskById(id: string): void {
    this.validateTaskIdExistance(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatusById(id: string, status: Status): ITasks {
    const task = this.validateTaskIdExistance(id);
    task.status = status;
    return task;
  }

  createTasks(createTaskDto: CreateTaskDto): ITasks {
    const { title, description } = createTaskDto;

    const createTask: ITasks = {
      id: uuid(),
      title,
      description,
      status: Status.OPEN,
    };

    this.tasks.push(createTask);
    return createTask;
  }
}
