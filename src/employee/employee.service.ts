import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeEntity } from './entities/employee.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateEmployeeDto } from './dto/create-employee';
import { EmployeeRepository } from './employee.repository';
import { isUUID } from 'class-validator';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async verifyId(id: string, user: UserEntity): Promise<EmployeeEntity> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for ID');
    }

    const findEmployee = await this.employeeRepository.findOne({
      where: { id, user },
    });

    if (!findEmployee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }

    return findEmployee;
  }

  async findAllEmployee(user: UserEntity): Promise<EmployeeEntity[]> {
    const findUser = await this.employeeRepository.find({ where: { user } });
    return findUser;
  }

  async findOneEmployee(id: string, user: UserEntity): Promise<EmployeeEntity> {
    const findUser = await this.verifyId(id, user);
    return findUser;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    user: UserEntity,
  ): Promise<EmployeeEntity> {
    return await this.employeeRepository.createEmployee(
      createEmployeeDto,
      user,
    );
  }
}
