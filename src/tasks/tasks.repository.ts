import { TaskEntity } from './task.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Status } from './task-status.enum';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: Status.OPEN,
    });
    await this.save(task);
    return task;
  }
}
