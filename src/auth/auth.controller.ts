import { Body, Controller, Post } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { ResponseDto } from '../common/response/dto/response.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.authService.signup(signUpCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<ResponseDto<{ accessToken: string; userId: string }>> {
    return this.authService.signin(signInCredentialsDto);
  }
}
