import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import {
  ConflictException,
  HttpStatus,
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
  async createUser(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<ResponseDto<UserEntity>> {
    const { name, email, password } = signUpCredentialsDto;

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const userCreation = this.create({ name, email, password: hashedPassword });
    try {
      await this.save(userCreation);
      return new ResponseDto({
        statusCode: HttpStatus.OK,
        message: 'Email cadastrado com sucesso',
      });
    } catch (error) {
      const uniqueViolationErr = '23505';
      if (error.code === uniqueViolationErr) {
        return new ResponseDto({
          statusCode: HttpStatus.CONFLICT,
          message: 'Email já cadastrado',
        });
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findTaskByUser(id: string): Promise<UserEntity> {
    const sql = await this.query(
      `select u."name", u."email"
      from "user" u where id='${id}'`,
    );

    return sql[0];
  }
}
