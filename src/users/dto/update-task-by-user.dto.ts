import { IsNotEmpty, IsOptional, IsUUID, ValidateIf } from 'class-validator';

export class UpdateTaskByUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  // @ValidateIf((o) => !o.description || o.title)
  title: string;

  @IsOptional()
  // @ValidateIf((o) => !o.title || o.description)
  description: string;
}
