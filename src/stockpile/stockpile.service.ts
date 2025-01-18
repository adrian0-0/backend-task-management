import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';
import { StockpileRepository } from './stockpile.repository';
import { isUUID } from 'class-validator';
import { TasksService } from 'src/tasks/tasks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { In } from 'typeorm';

@Injectable()
export class StockpileService {
  constructor(
    private readonly stockpileRepository: StockpileRepository,
    @Inject(forwardRef(() => TasksService))
    private readonly taskService: TasksService,
    private readonly taskRepository: TaskRepository,
    private readonly userService: UsersService,
  ) {}

  async verifyId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for ID');
    }

    const stockpile = await this.stockpileRepository.findOne({
      where: { id },
    });

    if (!stockpile) {
      throw new NotFoundException(`Stockpile with Id ${id} was not found`);
    }

    return stockpile;
  }
  async isTheSameTask(stockpileTaskId: string, taskId: string) {
    if (stockpileTaskId !== taskId) {
      throw new ConflictException(`Check the stockpile credentials`);
    }
    return true;
  }

  async findAllStockpile(user: UserEntity): Promise<StockPileEntity[]> {
    return this.stockpileRepository.findAllStockpile(user);
  }

  async findOneStockpile(
    id: string,
    user: UserEntity,
  ): Promise<StockPileEntity> {
    const stockpile = await this.verifyId(id);
    const task = await this.taskService.verifyId(stockpile.taskId, user.id);
    await this.isTheSameTask(stockpile.taskId, task.id);
    return await this.stockpileRepository.findOneStockpile(id, user);
  }

  async createStockPile(
    createStockPileDto: CreateStockpileDto,
  ): Promise<StockPileEntity> {
    return this.stockpileRepository.createStockpile(createStockPileDto);
  }

  async updateStockPile(
    id: string,
    updateStockPileDto: UpdateStockPileDto,
    user: UserEntity,
  ): Promise<StockPileEntity> {
    const stockpile = await this.verifyId(id);
    await this.taskService.verifyId(stockpile.taskId, user.id);
    return this.stockpileRepository.updateStockpile(
      updateStockPileDto,
      stockpile,
    );
  }

  async deleteStockPile(id: string, user: UserEntity): Promise<void> {
    const stockpile = await this.verifyId(id);
    await this.taskService.verifyId(stockpile.taskId, user.id);
    await this.stockpileRepository.delete(id);
  }
}
