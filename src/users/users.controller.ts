import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseDto } from 'src/common/response/dto/response.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  findTaskByUser(@Param('id') id: string): Promise<ResponseDto<UserEntity>> {
    return this.usersService.findTaskByUser(id);
  }
}
