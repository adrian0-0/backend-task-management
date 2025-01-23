import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'teste@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  @ApiProperty({ default: '+55 989888123' })
  phone: string;
}
