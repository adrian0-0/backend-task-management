import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { TaskEntity } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';
import { StockpileService } from '../stockpile/stockpile.service';
import { StockPileRepository } from '../stockpile/stockpile.repository';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskRepository,
    StockpileService,
    StockPileRepository,
    UsersService,
    UserRepository,
  ],
  imports: [TypeOrmModule.forFeature([TaskEntity]), AuthModule],
})
export class TasksModule {}
