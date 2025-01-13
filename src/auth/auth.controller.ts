import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signup(authCredentialDto);
  }

  @Post('/signin')
  // @ApiProperty({
  //   example: 'persian',
  // }) // @ApiProperty({ default: { password: '@KAIZAAR123!' } })
  signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ acessToken: string }> {
    return this.authService.signin(authCredentialsDto);
  }
}
