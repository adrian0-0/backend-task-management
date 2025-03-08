import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks/entities/task.entity';
import { TaskRepository } from './tasks/tasks.repository';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StockpileModule } from './stockpile/stockpile.module';
import { EmployeeModule } from './employee/employee.module';
import { TaskEmployeeModule } from './task-employee/task-employee.module';
import { CommonModule } from './common/common.module';
import { PassportModule } from '@nestjs/passport';
import { AppControler } from './app.controller';
import { AppService } from './appp.service';

@Module({
  controllers: [AppControler],
  providers: [AppService],
  imports: [
    TasksModule,
    AuthModule,
    DatabaseModule,
    UserModule,
    StockpileModule,
    EmployeeModule,
    TaskEmployeeModule,
    CommonModule,
    PassportModule,
  ],
  exports: [CommonModule, PassportModule],
})
export class AppModule {}
