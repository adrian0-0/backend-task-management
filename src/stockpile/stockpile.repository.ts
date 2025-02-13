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
    return storeStockpile;
  }

  async deleteStockPile(id: string): Promise<void> {
    await this.delete(id);
    return;
  }
}
