import { forwardRef, Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { TaskEntity } from './entities/task.entity';
import { AuthModule } from '../auth/auth.module';
import { StockpileService } from '../stockpile/stockpile.service';
import { StockpileRepository } from '../stockpile/stockpile.repository';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { StockpileModule } from '../stockpile/stockpile.module';
import { EmployeeRepository } from '../employee/employee.repository';
import { EmployeeService } from '../employee/employee.service';
import { TaskEmployeeService } from '../task-employee/task-employee.service';
import { TaskEmployeeRepository } from '../task-employee/task-employee.repository';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskRepository,
    TaskEmployeeRepository,
    StockpileService,
    StockpileRepository,
    UserService,
    UserRepository,
    EmployeeService,
    EmployeeRepository,
    TaskEmployeeService,
  ],
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule,
    forwardRef(() => StockpileModule),
  ],
})
export class TasksModule {}
