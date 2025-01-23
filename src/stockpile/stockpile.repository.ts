import { Repository, DataSource, In } from 'typeorm';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { UserEntity } from 'src/users/entities/user.entity';
import { deepStrictEqual } from 'assert';

@Injectable()
export class StockpileRepository extends Repository<StockPileEntity> {
  constructor(
    private readonly taskRepository: TaskRepository,
    private dataSource: DataSource,
  ) {
    super(StockPileEntity, dataSource.createEntityManager());
  }

  async findAllStockpile(user: UserEntity): Promise<StockPileEntity[]> {
    const sql = this.query(`
      select s.* 
      from task t 
      inner join "user" u ON t."userId" = u.id 
      inner join stockpile s on t.id = "taskId" 
      where u.id = '${user.id}'`);
    return sql;
  }

  async findOneStockpile(
    id: string,
    user: UserEntity,
  ): Promise<StockPileEntity> {
    const sql = this.query(`
      select s.* 
      from task t 
      inner join "user" u ON t."userId" = u.id 
      inner join stockpile s on t.id = "taskId" 
      where u.id = '${user.id}' and s.id = '${id}'`);
    return sql;
  }

  async createStockpile(
    createStockPileDto: CreateStockpileDto,
  ): Promise<StockPileEntity> {
    const stockpile = this.create(createStockPileDto);
    const storeStockpile = this.save(stockpile);
    return storeStockpile;
  }

  async updateStockpile(
    updateStockPileDto: UpdateStockPileDto,
    stockpile: StockPileEntity,
  ): Promise<StockPileEntity> {
    const updatedStockpile = Object.assign(stockpile, updateStockPileDto);
    const storeStockpile = this.save(updatedStockpile);
    return storeStockpile;
  }
}
