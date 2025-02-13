import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  createdAt: Date;

  @IsOptional()
  @IsString()
  alreadyFinished: Date;

  @IsOptional()
  @IsString()
  expectedToFinish: Date;
}
