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

  // @Get()
  // getTaks(@Query() filterDto: GetStatusFilterDto) {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getTasksWithFilter(filterDto);
  //   }
  //   return this.taskService.getAllTasks();
  // }

  @Get('/:id')
  getTaskbyId(@Param('id') id: string): Promise<TaskEntity> {
    return this.taskService.getTaskById(id);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): ITasks {
  //   return this.taskService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto) {
  //   return this.taskService.createTasks(createTaskDto);
  // }

  // @Patch('/:id/status')
  // updateTaskStatusById(
  //   @Param('id') id: string,
  //   @Body() updateTasksStatusDto: UpdateTasksStatusDto,
  // ): ITasks {
  //   return this.taskService.updateTaskStatusById(
  //     id,
  //     updateTasksStatusDto.status,
  //   );
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.taskService.deleteTaskById(id);
  // }
}
