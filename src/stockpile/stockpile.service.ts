import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';
import { StockPileRepository } from './stockpile.repository';
import { isUUID } from 'class-validator';

@Injectable()
export class StockpileService {
  constructor(
    private readonly stockPileRepository: StockPileRepository,
    private readonly stockRepository: StockPileRepository,
  ) {}

  async verifyId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for ID');
    }

    const stockpile = await this.stockPileRepository.findOneOrFail({
      where: { id },
    });

    if (!stockpile) {
      throw new NotFoundException(`Stockpile with Id ${id} was not found`);
    }

    return stockpile;
  }

  async findAllStockpile() {
    return this.stockPileRepository.find();
  }

  async findOneStockpile(id: string): Promise<StockPileEntity> {
    const stockpile = this.verifyId(id);
    return stockpile;
  }

  async createStockPile(
    createStockPileDto: CreateStockpileDto,
  ): Promise<StockPileEntity> {
    return this.stockPileRepository.createStockpile(createStockPileDto);
  }

  async updateStockPile(
    id: string,
    updateStockPileDto: UpdateStockPileDto,
  ): Promise<StockPileEntity> {
    const stockpile = await this.verifyId(id);

    return this.stockPileRepository.updateStockpile(
      updateStockPileDto,
      stockpile,
    );
  }

  async deleteStockPile(id: string): Promise<void> {
    await this.verifyId(id);
    await this.stockRepository.delete(id);
  }
}
