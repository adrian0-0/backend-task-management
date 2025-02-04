import {
  HttpCode,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialsDto } from './dto/auth-credentials.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { ResponseDto } from '../common/response/dto/response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    return this.userRepository.createUser(signUpCredentialsDto);
  }

  async signin<T>(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ acessToken: string } | ResponseDto<T>> {
    const { email, password } = signInCredentialsDto;
    const findUser = await this.userRepository.findOneBy({ email });

    if (findUser && (await compare(password, findUser.password))) {
      const payload: IJwtPayload = { email };
      const acessToken: string = await this.jwtService.sign(payload);
      return { acessToken };
    } else {
      return new ResponseDto<T>({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Por favor cheque suas credenciais de login!',
      });
    }
  }
}
