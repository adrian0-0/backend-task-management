import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../users/entities/user.entity';
import { StockPileRepository } from 'src/stockpile/stockpile.repository';
import { isUUID } from 'class-validator';
import { StockpileService } from 'src/stockpile/stockpile.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
    private readonly userService: UsersService,
    private readonly stockpileRepository: StockPileRepository,
    private readonly stockpileService: StockpileService,
  ) {}

  async verifyId(id: string): Promise<TaskEntity> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for ID');
    }

    const findTask = await this.taskRepository.findOne({
      where: { id },
    });

    if (!findTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return findTask;
  }

  async isTheSameUser(taskId: string, userId: string) {
    if (taskId !== userId) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async getTasks(
    filterDto: GetStatusFilterDto,
    user: UserEntity,
  ): Promise<TaskEntity[]> {
    await this.userService.verifyId(user.id);
    return await this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: UserEntity): Promise<TaskEntity> {
    const task = await this.verifyId(id);
    await this.isTheSameUser(task.userId, user.id);
    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<void> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTask(
    id: string,
    user: UserEntity,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    const task = await this.verifyId(id);
    await this.isTheSameUser(task.userId, user.id);

    const assignTaskUser = Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(assignTaskUser);
  }

  async attachTaskToStockpile(
    taskId: string,
    stockpileId: string,
  ): Promise<TaskEntity> {
    const task = await this.verifyId(taskId);
    const stockpile = await this.stockpileService.verifyId(stockpileId);

    if (task && stockpile) {
      const assignTaskToStockpile = Object.assign(task, stockpile);
      const storeTaskStockpile = await this.stockpileRepository.save(
        assignTaskToStockpile,
      );
      return storeTaskStockpile;
    }
  }

  async deleteTask(id: string, user: UserEntity): Promise<void> {
    const task = await this.verifyId(id);
    await this.isTheSameUser(task.userId, user.id);
    return await this.taskRepository.deleteTask(id);
  }
}
