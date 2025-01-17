import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  findTaskByUser(@Param('id') id: string): Promise<void> {
    return this.usersService.findTaskByUser(id);
  }
}
