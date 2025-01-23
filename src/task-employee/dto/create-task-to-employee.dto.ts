import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskToEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  taskId: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  employeeId: string[];
}
