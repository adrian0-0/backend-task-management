import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.stategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, UserRepository, JWTStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: String(process.env.JWT_SECRET),
        signOptions: {
          expiresIn: Number(process.env.JWT_EXPIRES_IN),
        },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
