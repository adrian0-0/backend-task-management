import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stockpile')
export class StockPileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quant: number;

  @Column()
  description: string;

  @ManyToOne(() => TaskEntity, (task) => task.stockpile, {
    onDelete: 'CASCADE',
  })
  task: TaskEntity;

  @Column({ name: 'taskId' })
  taskId: string;
}
