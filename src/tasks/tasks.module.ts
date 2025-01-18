import { forwardRef, Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { TaskEntity } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';
import { StockpileService } from '../stockpile/stockpile.service';
import { StockpileRepository } from '../stockpile/stockpile.repository';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';
import { StockpileModule } from 'src/stockpile/stockpile.module';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskRepository,
    StockpileService,
    StockpileRepository,
    UsersService,
    UserRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule,
    forwardRef(() => StockpileModule),
  ],
})
export class TasksModule {}
