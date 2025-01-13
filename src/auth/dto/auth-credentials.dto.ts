import { ApiProperty } from '@nestjs/swagger';
import {
  isNotEmpty,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ default: 'kaizar' })
  username: string;

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
