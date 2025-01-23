import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { User } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateEmployeeDto } from './dto/create-employee';
import { EmployeeEntity } from './entities/employee.entity';
import { TaskEmployeeService } from 'src/task-employee/task-employee.service';

@Controller('employee')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly taskEmployeeService: TaskEmployeeService,
  ) {}

  @Get()
  findAllEmployee(@User() user: UserEntity): Promise<EmployeeEntity[]> {
    return this.employeeService.findAllEmployee(user);
  }

  @Get('/:id')
  findOneEmployee(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<EmployeeEntity> {
    return this.employeeService.findOneEmployee(id, user);
  }

  @Post()
  createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @User() user: UserEntity,
  ): Promise<EmployeeEntity> {
    return this.employeeService.createEmployee(createEmployeeDto, user);
  }

  @Post('/tasks/:id')
  attachTaskstoEmployee(
    @Param('id') id: string,
    @Body() taskId: string[],
    user: UserEntity,
  ): Promise<void> {
    return this.taskEmployeeService.attachTaskstoEmployee(id, taskId, user);
  }
}
