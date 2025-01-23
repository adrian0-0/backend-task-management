import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeEntity } from './entities/employee.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { isUUID } from 'class-validator';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
    user: UserEntity,
  ): Promise<EmployeeEntity> {
    const employee = await this.verifyId(id, user);
    return this.employeeRepository.updateEmployee(employee, updateEmployeeDto);
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

  async deleteEmployee(id: string, user: UserEntity): Promise<void> {
    await this.verifyId(id, user);
    return await this.employeeRepository.deleteEmployee(id);
  }
}
