import { IsEnum } from 'class-validator';
import { Status } from '../task.model';

export class UpdateTasksStatusDto {
  @IsEnum(Status)
  status: Status;
}
