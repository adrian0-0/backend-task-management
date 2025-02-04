import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { genSalt, hash } from 'bcrypt';
import { ResponseDto } from 'src/common/response/dto/response.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async createUser(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    const { name, email, password } = signUpCredentialsDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const userCreation = this.create({ name, email, password: hashedPassword });
    try {
      await this.save(userCreation);
    } catch (error) {
      const uniqueViolationErr = '23505';
      if (error.code === uniqueViolationErr) {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findTaskByUser(id: string): Promise<UserEntity> {
    const sql = await this.query(
      `select t.*
      from task t inner join "user" u ON "userId" = U.id and U.id = '${id}'`,
    );

    return sql;
  }
}
