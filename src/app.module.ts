import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks/entities/task.entity';
import { TaskRepository } from './tasks/tasks.repository';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { StockpileModule } from './stockpile/stockpile.module';
import { EmployeeModule } from './employee/employee.module';
import { TaskEmployeeModule } from './task-employee/task-employee.module';

@Module({
  imports: [
    TasksModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    StockpileModule,
    EmployeeModule,
    TaskEmployeeModule,
  ],
})
export class AppModule {}
