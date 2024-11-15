import { Status } from '../task.model';

export class GetStatusFilterDto {
  status?: Status;
  search?: string;
}
