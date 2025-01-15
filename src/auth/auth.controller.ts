import { Body, Controller, Post } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    return this.authService.signup(signUpCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ acessToken: string }> {
    return this.authService.signin(signInCredentialsDto);
  }
}
