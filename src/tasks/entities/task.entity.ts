import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../task-status.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { StockPileEntity } from 'src/stockpile/entities/stockpile.entity';

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

  @Column()
  alreadyFinished: Date;

  @ManyToOne(() => UserEntity, (user) => user.task)
  user: UserEntity;

  @Column({ name: 'userId' })
  userId: string;

  @OneToMany(() => StockPileEntity, (stockpile) => stockpile.task)
  stockpile: StockPileEntity[];
}
