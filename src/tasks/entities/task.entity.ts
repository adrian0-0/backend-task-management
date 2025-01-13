import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../task-status.enum';
import { UserEntity } from '../../auth/entities/user.entity';
import { Exclude } from 'class-transformer';

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

  @ManyToOne(() => UserEntity, (user) => user.task)
  user: UserEntity;
}
