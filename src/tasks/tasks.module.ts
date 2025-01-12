import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { TaskEntity } from './task.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  imports: [TypeOrmModule.forFeature([TaskEntity]), AuthModule],
})
export class TasksModule {}
