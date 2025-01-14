import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskByUserDto } from './dto/update-task-by-user.dto';
import { TaskRepository } from 'src/tasks/tasks.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async findTaskByUser(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });
      console.log(user);
      if (user) {
        return this.userRepository.findTaskByUser(id);
      }
    } catch (error) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async updateTaskbyUser(
    id: string,
    updateTaskByUserDto: UpdateTaskByUserDto,
  ): Promise<UpdateTaskByUserDto> {
    console.log(id, updateTaskByUserDto);
    try {
      const task = await this.taskRepository.findOneBy({
        id,
      });

      const { id: userId, title, description } = updateTaskByUserDto;
      const user = await this.userRepository.findOneBy({
        id: userId,
      });
      if (task && user) {
        task.title = title;
        task.description = description;
        console.log(task);
        return this.taskRepository.save(task);
      }
    } catch (error) {
      throw new NotFoundException(`User or Task not found`);
    }
  }
}
