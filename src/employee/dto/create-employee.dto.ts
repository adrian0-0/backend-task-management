import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ default: 'teste@gmail.com' })
  email: string;

  @IsOptional()
  @IsMobilePhone('pt-BR')
  @ApiProperty({ default: '+55 989888123' })
  phone: string;
}
