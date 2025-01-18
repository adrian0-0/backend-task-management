import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/entities/user.entity';
import { User } from '../auth/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTaks(@Query() filterDto: GetStatusFilterDto, @User() user: UserEntity) {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskbyId(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch('/:id')
  updateTaskByUser(
    @Param('id') id: string,
    @User() user: UserEntity,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    return this.taskService.updateTask(id, user, updateTaskDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }
}
