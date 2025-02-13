import e from 'express';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('taskEmployee')
export class TaskEmployeeEntity {
  @PrimaryColumn()
  taskId: string;

  @PrimaryColumn()
  employeeId: string;

  @ManyToOne(() => TaskEntity, (task) => task.taskEmployees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskId' })
  task: TaskEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.taskEmployees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employeeId' })
  employee: EmployeeEntity;
}
