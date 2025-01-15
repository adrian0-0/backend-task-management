import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialsDto } from './dto/auth-credentials.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { throwError } from 'rxjs';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    if (!signUpCredentialsDto) {
      throw new NotFoundException(`password or email is empty`);
    }
    return this.userRepository.createUser(signUpCredentialsDto);
  }

  async signin(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ acessToken: string; userId: string }> {
    const { email, password } = signInCredentialsDto;
    console.log(process.env.JWT_SECRET + 'signin');
    const findEmail = await this.userRepository.findOneBy({ email });

    if (findEmail && (await compare(password, findEmail.password))) {
      const { id: userId } = findEmail;
      const payload: IJwtPayload = { email };
      const acessToken: string = await this.jwtService.sign(payload);
      return { acessToken, userId };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
