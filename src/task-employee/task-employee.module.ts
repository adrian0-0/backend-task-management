import { forwardRef, Module } from '@nestjs/common';
import { TaskEmployeeService } from './task-employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEmployeeEntity } from './entities/task-employee.entity';
import { AuthModule } from '../auth/auth.module';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { StockpileRepository } from 'src/stockpile/stockpile.repository';
import { StockpileService } from 'src/stockpile/stockpile.service';
import { UserService } from '../user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { TasksController } from 'src/tasks/tasks.controller';
import { EmployeeService } from 'src/employee/employee.service';
import { TaskEmployeeRepository } from './task-employee.repository';

@Module({
  controllers: [TasksController],
  providers: [
    TaskEmployeeService,
    EmployeeService,
    TaskEmployeeRepository,
    EmployeeRepository,
    TasksService,
    TaskRepository,
    StockpileService,
    StockpileRepository,
    UserService,
    UserRepository,
  ],
  imports: [TypeOrmModule.forFeature([TaskEmployeeEntity]), AuthModule],
})
export class TaskEmployeeModule {}
