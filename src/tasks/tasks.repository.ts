import { TaskEntity } from './task.entity';
import { Repository, DataSource, Brackets } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Status } from './task-status.enum';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetStatusFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
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

    const tasks = await query.getMany();
    return tasks;
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

  async deleteTask(id: string): Promise<void> {
    await this.delete(id);
  }
}
