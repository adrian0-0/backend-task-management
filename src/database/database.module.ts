import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../tasks/entities/task.entity';
import { StockPileEntity } from 'src/stockpile/entities/stockpile.entity';
import { config } from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
          entities: [TaskEntity],
          ...(configService.get('NODE_ENV') === 'production' && {
            ssl: {
              rejectUnauthorized: true,
            },
          }),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
