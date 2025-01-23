import { IsEnum, IsOptional } from 'class-validator';
import { Status } from '../task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  alreadyFinished: Date;

  @IsOptional()
  expectedToFinish: Date;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
