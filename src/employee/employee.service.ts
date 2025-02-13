import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmployeeEntity } from './entities/employee.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeRepository } from './employee.repository';
import { isUUID } from 'class-validator';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResponseDto } from 'src/common/response/dto/response.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async verifyId(
    id: string,
    user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity>> {
    if (!isUUID(id)) {
      return new ResponseDto({
        message: 'Seu Id de identificação é invalido',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const employee = await this.employeeRepository.findOne({
      where: { id, user },
    });

    if (!employee) {
      return new ResponseDto({
        message: `Funcionário com Id ${id} não foi encontrado`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: employee,
    });
  }

  async findAllEmployee(
    user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity[]>> {
    const findUser = await this.employeeRepository.find({ where: { user } });
    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: findUser,
    });
  }

  async findOneEmployee(
    id: string,
    user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity>> {
    const employee = await this.verifyId(id, user);
    return employee;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity>> {
    const employee = await this.employeeRepository.createEmployee(
      createEmployeeDto,
      user,
    );
    return new ResponseDto({
      statusCode: HttpStatus.CREATED,
      message: `Funcionário criado com sucesso`,
      data: employee,
    });
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
    user: UserEntity,
  ): Promise<ResponseDto<EmployeeEntity>> {
    const employee = await this.verifyId(id, user);
    if (employee.statusCode !== HttpStatus.OK) {
      return employee;
    }

    const updateEmployee = await this.employeeRepository.updateEmployee(
      employee,
      updateEmployeeDto,
    );
    return new ResponseDto({
      data: updateEmployee,
      statusCode: HttpStatus.OK,
      message: `Funcionário atualizado com sucesso`,
    });
  }

  async deleteEmployee(id: string, user: UserEntity): Promise<void> {
    const employee = await this.verifyId(id, user);
    if (employee.statusCode !== HttpStatus.OK) {
      throw new HttpException(employee.message, employee.statusCode);
    }
    await this.employeeRepository.deleteEmployee(id);
  }
}
