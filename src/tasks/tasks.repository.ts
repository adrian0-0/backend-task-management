import { TaskEntity } from './entities/task.entity';
import { Repository, DataSource, Brackets } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Status } from './task-status.enum';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UserEntity } from '../users/entities/user.entity';
import { compare } from 'bcrypt';

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

    const tasks = await this.find({ where: { userId: id } });
    return tasks;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    return;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<void> {
    const { title, description, createdAt, expectedToFinish, alreadyFinished } =
      createTaskDto;
    const task = this.create({
      user: user,
      title,
      description,
      status: Status.OPEN,
      createdAt,
      expectedToFinish,
      alreadyFinished,
    });
    await this.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.delete({ id });
  }
}
