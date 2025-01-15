import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../task-status.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { IsEmpty, IsOptional } from 'class-validator';
import { timeStamp } from 'console';
import { networkInterfaces } from 'os';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ default: Date.now() })
  createdAt: String;

  @Column()
  @IsOptional()
  expectedToFinish: String;

  @Column()
  @IsOptional()
  alreadyFinished: String;

  @ManyToOne(() => UserEntity, (user) => user.task)
  user: UserEntity;
}
