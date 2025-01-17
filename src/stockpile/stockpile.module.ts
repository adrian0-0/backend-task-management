import { Module } from '@nestjs/common';
import { StockpileController } from './stockpile.controller';
import { StockpileService } from './stockpile.service';
import { StockPileRepository } from './stockpile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockPileEntity } from './entities/stockpile.entity';

@Module({
  controllers: [StockpileController],
  providers: [StockpileService, StockPileRepository],
  imports: [TypeOrmModule.forFeature([StockPileEntity])],
})
export class StockpileModule {}
