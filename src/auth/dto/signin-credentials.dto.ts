import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'kaizar@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @ApiProperty({
    default: '@KAIZAAAr123',
  })
  password: string;
}
