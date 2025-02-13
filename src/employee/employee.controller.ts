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
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { User } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';
import { TaskEmployeeService } from 'src/task-employee/task-employee.service';
import { ResponseDto } from '../common/response/dto/response.dto';

@Controller('employee')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly taskEmployeeService: TaskEmployeeService,
  ) {}

  @Get()
  findAllEmployee(
    @User() user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity[]>> {
    return this.employeeService.findAllEmployee(user);
  }

  @Get('/:id')
  findOneEmployee(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity>> {
    return this.employeeService.findOneEmployee(id, user);
  }

  @Post()
  createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @User() user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity>> {
    return this.employeeService.createEmployee(createEmployeeDto, user);
  }

  @Post('/tasks/:id')
  attachTaskstoEmployee(
    @Param('id') id: string,
    @Body() taskId: string[],
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskEmployeeService.attachTaskstoEmployee(id, taskId, user);
  }

  @Patch('/:id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @User() user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity>> {
    return this.employeeService.updateEmployee(id, updateEmployeeDto, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteEmployee(@Param('id') id: string, user: UserEntity): Promise<void> {
    return this.employeeService.deleteEmployee(id, user);
  }
}
