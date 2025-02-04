import { DataSource, Repository } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskToEmployeeDto } from 'src/task-employee/dto/create-task-to-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResponseDto } from 'src/common/response/dto/response.dto';

@Injectable()
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(dataSource: DataSource) {
    super(EmployeeEntity, dataSource.createEntityManager());
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    user: UserEntity,
  ): Promise<EmployeeEntity> {
    const { name, email, phone, role } = createEmployeeDto;
    const employee = this.create({
      name,
      email,
      phone,
      role,
      userId: user.id,
    });
    const storeEmployee = await this.save(employee);
    return storeEmployee;
  }

  async updateEmployee(
    employee: ResponseDto<EmployeeEntity>,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    const assignEmployee = Object.assign(employee.data, updateEmployeeDto);
    const storeEmployee = await this.save(assignEmployee);
    return storeEmployee;
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.delete(id);
    return;
  }
}
