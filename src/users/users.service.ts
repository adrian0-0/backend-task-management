import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async verifyId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for ID');
    }

    const findUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!findUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return findUser;
  }

  async findTaskByUser(id: string): Promise<void> {
    await this.verifyId(id);
    return await this.userRepository.findTaskByUser(id);
  }

  // async updateTaskbyUser(
  //   id: string,
  //   updateTaskByUserDto: UpdateTaskByUserDto,
  // ): Promise<UpdateTaskByUserDto> {
  //   const task = await this.taskService.verifyId(id);
  //   const user = await this.verifyId(id);
  //   if (task && user) {
  //     const assignTaskUser = Object.assign(task, updateTaskByUserDto);
  //     return this.taskRepository.save(assignTaskUser);
  //   }
  // }
}
