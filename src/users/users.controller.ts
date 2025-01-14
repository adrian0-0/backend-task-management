import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { UpdateTaskByUserDto } from './dto/update-task-by-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  findTaskByUser(@Param('id') id: string): Promise<void> {
    return this.usersService.findTaskByUser(id);
  }

  @Patch('/:id')
  updateTaskByUser(
    @Param('id') id: string,
    @Body() updateTaskByUserDto: UpdateTaskByUserDto,
  ): Promise<UpdateTaskByUserDto> {
    return this.usersService.updateTaskbyUser(id, updateTaskByUserDto);
  }
}
