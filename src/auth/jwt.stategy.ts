import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from './jwt-payload.interface';
import { UserEntity } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: String(process.env.JWT_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJwtPayload): Promise<UserEntity> {
    const { email } = payload;
    const findEmail: UserEntity = await this.userRepository.findOneBy({
      email,
    });

    if (!findEmail) {
      throw new UnauthorizedException();
    }
    return findEmail;
  }
}
