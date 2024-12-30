import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks/task.entity';
import { TaskRepository } from './tasks/tasks.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      entities: [TaskEntity],
    }),
    AuthModule,
  ],
})
export class AppModule {}
