import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseDto } from 'src/common/response/dto/response.dto';
import { UserEntity } from './entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  findTaskByUser(@Param('id') id: string): Promise<ResponseDto<UserEntity>> {
    return this.userService.findTaskByUser(id);
  }
}
