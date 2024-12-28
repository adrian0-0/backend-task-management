import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UpdateTasksStatusDto } from './dto/update-task-status.dto';
import { Status } from './task-status.enum';
import { TaskEntity } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTaks(@Query() filterDto: GetStatusFilterDto) {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskbyId(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTasksStatusDto: UpdateTasksStatusDto,
  ): Promise<TaskEntity> {
    const { status } = updateTasksStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
