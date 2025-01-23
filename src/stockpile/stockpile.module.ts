import { forwardRef, Module } from '@nestjs/common';
import { StockpileController } from './stockpile.controller';
import { StockpileService } from './stockpile.service';
import { StockpileRepository } from './stockpile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockPileEntity } from './entities/stockpile.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';
import { TasksModule } from '../tasks/tasks.module';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeRepository } from '../employee/employee.repository';

@Module({
  controllers: [StockpileController],
  providers: [
    StockpileService,
    StockpileRepository,
    TasksService,
    TaskRepository,
    UsersService,
    UserRepository,
    EmployeeService,
    EmployeeRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([StockPileEntity]),
    AuthModule,
    forwardRef(() => TasksModule),
  ],
})
export class StockpileModule {}
