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
import { CreateTaskToEmployeeDto } from '../task-employee/dto/create-task-to-employee.dto';
import { TaskEmployeeService } from '../task-employee/task-employee.service';

@Controller('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class TasksController {
  constructor(
    private taskService: TasksService,
    private readonly taskEmployeeService: TaskEmployeeService,
  ) {}

  @Get()
  getTaks(@Query() filterDto: GetStatusFilterDto, @User() user: UserEntity) {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  findOneTask(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<TaskEntity> {
    return this.taskService.findOneTask(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Post('/employee/:id')
  attachEmployeesToTask(
    @Param('id') id: string,
    @Body() employeeId: string[],
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskEmployeeService.attachEmployeesToTask(id, employeeId, user);
  }

  @Patch('/employee/:id')
  updateEmployeesToTask(
    @Param('id') id: string,
    @Body() employeeId: string[],
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskEmployeeService.updateEmployeesToTask(id, employeeId, user);
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
