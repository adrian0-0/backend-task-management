import { PartialType } from '@nestjs/swagger';
import { CreateStockpileDto } from './create-stockpile.dto';

export class UpdateStockPileDto extends PartialType(CreateStockpileDto) {}
