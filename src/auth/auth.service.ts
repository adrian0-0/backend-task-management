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
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<ResponseDto<UserEntity>> {
    return this.userRepository.createUser(signUpCredentialsDto);
  }

  async signin(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<ResponseDto<string>> {
    const { email, password } = signInCredentialsDto;
    const findUser = await this.userRepository.findOneBy({ email });

    if (findUser && (await compare(password, findUser.password))) {
      const payload: IJwtPayload = { email };
      const acessToken: string = await this.jwtService.sign(payload);
      return new ResponseDto<string>({
        statusCode: HttpStatus.OK,
        message: 'Login realizado com sucesso',
        data: acessToken,
      });
    } else {
      return new ResponseDto<string>({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Por favor cheque suas credenciais de login!',
      });
    }
  }
}
