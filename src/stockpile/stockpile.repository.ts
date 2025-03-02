import { Repository, DataSource, In } from 'typeorm';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { Injectable } from '@nestjs/common';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class StockpileRepository extends Repository<StockPileEntity> {
  constructor(private dataSource: DataSource) {
    super(StockPileEntity, dataSource.createEntityManager());
  }

  async findAllStockpile(user: UserEntity): Promise<StockPileEntity[]> {
    const sql = await this.query(`
      select s.id, s.name, s.quant, s.description,
      t.title as "taskTitle", t.status as "taskStatus"
      from stockpile s 
      left join task t ON s."taskId" = t.id
      where s."userId" ='${user.id}'`);
    return sql;
  }

  async findOneStockpile(id: string): Promise<StockPileEntity> {
    const [sql] = await this.query(`
      select s.name, s.quant, s.description, t.id as "taskId",
      t.title as "taskTitle", t.description as "taskDescription", 
      t.status as "taskStatus", t."createdAt" as "taskCreatedAt",
      t."expectedToFinish" as "taskExpectedToFinish",
      t."alreadyFinished" as "taskAlreadyFinished"
      from stockpile s 
      left join task t ON s."taskId" = t.id 
      where s.id = '${id}'
      group by s.id, t.id
    `);
    return sql;
  }

  async createStockpile(
    createStockPileDto: CreateStockpileDto,
    user: UserEntity,
  ): Promise<StockPileEntity> {
    const { name, description, quant, taskId } = createStockPileDto;
    const stockpile = this.create({
      name,
      description,
      quant,
      taskId,
      userId: user.id,
    });
    const storeStockpile = this.save(stockpile);
    return storeStockpile;
  }

  async updateStockpile(
    updateStockPileDto: UpdateStockPileDto,
    stockpile: StockPileEntity,
  ): Promise<StockPileEntity> {
    const updatedStockpile = Object.assign(stockpile, updateStockPileDto);
    const storeStockpile = this.save(updatedStockpile);
    return updatedStockpile;
  }

  async deleteStockPile(id: string): Promise<void> {
    await this.delete(id);
    return;
  }
}
