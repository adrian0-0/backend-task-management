import { Status } from '../task-status.enum';

export class GetStatusFilterDto {
  status?: Status;
  search?: string;
}
