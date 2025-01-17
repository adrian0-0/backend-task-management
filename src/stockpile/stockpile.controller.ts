import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StockpileService } from './stockpile.service';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';

@Controller('stockpile')
export class StockpileController {
  constructor(private readonly stockPileService: StockpileService) {}

  @Get()
  findAllStockpile() {
    return this.stockPileService.findAllStockpile();
  }

  @Get('/:id')
  findOneStockPile(@Param('id') id: string): Promise<StockPileEntity> {
    return this.stockPileService.findOneStockpile(id);
  }

  @Post()
  createStockPile(
    @Body() createStockPileDto: CreateStockpileDto,
  ): Promise<StockPileEntity> {
    return this.stockPileService.createStockPile(createStockPileDto);
  }

  @Patch('/:id')
  updateStockPile(
    @Param('id') id: string,
    @Body() updateStockPileDto: UpdateStockPileDto,
  ): Promise<StockPileEntity> {
    return this.stockPileService.updateStockPile(id, updateStockPileDto);
  }

  @Delete('/:id')
  deleteStockPile(@Param('id') id: string): Promise<void> {
    return this.stockPileService.deleteStockPile(id);
  }
}
