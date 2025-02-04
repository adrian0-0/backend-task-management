import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { StockPileEntity } from 'src/stockpile/entities/stockpile.entity';

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

  @OneToMany(() => EmployeeEntity, (employee) => employee.user)
  employee: EmployeeEntity[];

  @OneToMany(() => StockPileEntity, (stockpile) => stockpile.user)
  stockpile: StockPileEntity[];
}
