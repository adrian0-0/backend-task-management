import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './task-status.enum';
import { UserEntity } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: Status;

  @ManyToOne((_type) => UserEntity, (user) => user.task, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
