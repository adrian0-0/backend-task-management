import { IsEnum } from 'class-validator';
import { Status } from '../task-status.enum';

export class UpdateTasksStatusDto {
  @IsEnum(Status)
  status: Status;
}
