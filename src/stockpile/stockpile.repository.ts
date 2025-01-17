import { Repository, DataSource } from 'typeorm';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { Injectable } from '@nestjs/common';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';

@Injectable()
export class StockPileRepository extends Repository<StockPileEntity> {
  constructor(private dataSource: DataSource) {
    super(StockPileEntity, dataSource.createEntityManager());
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
