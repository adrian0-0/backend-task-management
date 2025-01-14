import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { TaskRepository } from 'src/tasks/tasks.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, TaskRepository],
})
export class UsersModule {}
