import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StockpileService } from './stockpile.service';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';
import { User } from '../auth/get-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('stockpile')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class StockpileController {
  constructor(private readonly stockPileService: StockpileService) {}

  @Get()
  findAllStockpile(@User() user: UserEntity): Promise<StockPileEntity[]> {
    return this.stockPileService.findAllStockpile(user);
  }

  @Get('/:id')
  findOneStockPile(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<StockPileEntity> {
    return this.stockPileService.findOneStockpile(id, user);
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
    @User() user: UserEntity,
  ): Promise<StockPileEntity> {
    return this.stockPileService.updateStockPile(id, updateStockPileDto, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteStockPile(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.stockPileService.deleteStockPile(id, user);
  }
}
