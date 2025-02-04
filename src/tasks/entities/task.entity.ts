import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../task-status.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { StockPileEntity } from '../../stockpile/entities/stockpile.entity';
import { TaskEmployeeEntity } from '../../task-employee/entities/task-employee.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: Status;

  @Column()
  createdAt: Date;

  @Column()
  expectedToFinish: Date;

  @Column({ nullable: true })
  alreadyFinished?: Date;

  @ManyToOne(() => UserEntity, (user) => user.task)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ name: 'userId' })
  userId: string;

  @OneToMany(() => StockPileEntity, (stockpile) => stockpile.task, {
    onDelete: 'CASCADE',
  })
  stockpile: StockPileEntity[];

  @OneToMany(() => TaskEmployeeEntity, (taskEmployee) => taskEmployee.task)
  taskEmployees: TaskEmployeeEntity[];
}
