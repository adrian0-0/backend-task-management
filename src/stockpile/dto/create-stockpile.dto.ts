import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStockpileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quant: number;

  @IsOptional()
  description: string;
}
