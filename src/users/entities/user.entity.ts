import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  task: TaskEntity[];
}
