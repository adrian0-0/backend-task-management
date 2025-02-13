import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { StockPileEntity } from './entities/stockpile.entity';
import { CreateStockpileDto } from './dto/create-stockpile.dto';
import { UpdateStockPileDto } from './dto/update-stockpile.dto';
import { StockpileRepository } from './stockpile.repository';
import { isUUID } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ResponseDto } from 'src/common/response/dto/response.dto';
import { hrtime } from 'process';

@Injectable()
export class StockpileService {
  constructor(private readonly stockpileRepository: StockpileRepository) {}

  async verifyId(
    id: string,
    user: UserEntity,
  ): Promise<ResponseDto<StockPileEntity>> {
    if (!isUUID(id)) {
      return new ResponseDto({
        message: 'Seu Id de identificação é invalido',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const stockpile = await this.stockpileRepository.findOne({
      where: { id, user },
    });

    if (!stockpile) {
      return new ResponseDto({
        message: `Item com Id ${id} não foi encontrado`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: stockpile,
    });
  }

  async findAllStockpile(
    user: UserEntity,
  ): Promise<ResponseDto<StockPileEntity[]>> {
    const stockpile = await this.stockpileRepository.find({ where: { user } });
    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: stockpile,
    });
  }

  async findOneStockpile(
    id: string,
    user: UserEntity,
  ): Promise<ResponseDto<StockPileEntity>> {
    const stockpile = await this.verifyId(id, user);
    return stockpile;
  }

  async createStockPile(
    createStockPileDto: CreateStockpileDto,
    user: UserEntity,
  ): Promise<ResponseDto<StockPileEntity>> {
    const stockpile = await this.stockpileRepository.createStockpile(
      createStockPileDto,
      user,
    );
    return new ResponseDto({
      statusCode: HttpStatus.CREATED,
      message: 'Item adcionado ao estoque',
      data: stockpile,
    });
  }

  async updateStockPile(
    id: string,
    updateStockPileDto: UpdateStockPileDto,
    user: UserEntity,
  ): Promise<ResponseDto<StockPileEntity>> {
    const stockpile = await this.verifyId(id, user);
    if (stockpile.statusCode !== HttpStatus.OK) {
      return stockpile;
    }

    const stockpileData = await this.stockpileRepository.updateStockpile(
      updateStockPileDto,
      stockpile.data,
    );

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      message: 'Item atualizado no estoque',
      data: stockpileData,
    });
  }

  async deleteStockPile(id: string, user: UserEntity): Promise<void> {
    const stockpile = await this.verifyId(id, user);

    if (stockpile.statusCode !== HttpStatus.OK) {
      throw new HttpException(stockpile.message, stockpile.statusCode);
    }
    await this.stockpileRepository.deleteStockPile(id);
  }
}
