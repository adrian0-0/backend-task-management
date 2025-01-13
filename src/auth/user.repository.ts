import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const userCreation = this.create({ username, password: hashedPassword });
    try {
      await this.save(userCreation);
    } catch (error) {
      const uniqueViolationErr = '23505';
      if (error.code === uniqueViolationErr) {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
