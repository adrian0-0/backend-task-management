import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeRepository } from './employee.repository';
import { TaskEmployeeService } from 'src/task-employee/task-employee.service';
import { TaskEmployeeRepository } from 'src/task-employee/task-employee.repository';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { StockpileService } from 'src/stockpile/stockpile.service';
import { StockpileRepository } from 'src/stockpile/stockpile.repository';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    TaskEmployeeService,
    TaskEmployeeRepository,
    TasksService,
    TaskRepository,
    StockpileService,
    StockpileRepository,
    UserService,
    UserRepository,
  ],
  imports: [TypeOrmModule.forFeature([EmployeeEntity]), AuthModule],
})
export class EmployeeModule {}
