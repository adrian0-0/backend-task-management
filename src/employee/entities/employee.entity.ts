import { TaskEmployeeEntity } from '../../task-employee/entities/task-employee.entity';
import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
  @Column({ name: 'userId' })
  userId: string;

  @OneToMany(() => TaskEmployeeEntity, (taskEmployee) => taskEmployee.employee)
  taskEmployees: TaskEmployeeEntity[];
}
