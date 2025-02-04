import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { ResponseDto } from '../common/response/dto/response.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async verifyId(id: string): Promise<ResponseDto<UserEntity>> {
    if (!isUUID(id)) {
      return new ResponseDto({
        message: 'Seu Id de identificação é invalido',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return new ResponseDto({
        message: `Usuário com Id ${id} não foi encontrado`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: user,
    });
  }

  async findTaskByUser(id: string): Promise<ResponseDto<UserEntity>> {
    const user = await this.verifyId(id);
    if (user.statusCode !== HttpStatus.OK) {
      return user;
    }
    const userData = await this.userRepository.findTaskByUser(id);

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: userData,
    });
  }
}
