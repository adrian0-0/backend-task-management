import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UserRepository } from '../users/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './jwt.stategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [AuthService, UserRepository, JWTStrategy],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<number>('JWT_EXPIRES_IN') || 3600,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  // imports: [
  //   PassportModule.register({ defaultStrategy: 'jwt' }),
  //   JwtModule.register({
  //     secret: 'topSecret51',
  //     signOptions: {
  //       expiresIn: 3600,
  //     },
  //   }),

  //   TypeOrmModule.forFeature([UserEntity]),
  // ],
})
export class AuthModule {}
