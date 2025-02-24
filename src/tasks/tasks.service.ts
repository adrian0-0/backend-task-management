import {
  BadRequestException,
  ConflictException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetStatusFilterDto } from './dto/get-status-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from '../user/entities/user.entity';
import { StockpileRepository } from 'src/stockpile/stockpile.repository';
import { isUUID } from 'class-validator';
import { StockpileService } from 'src/stockpile/stockpile.service';
import { UserService } from 'src/user/user.service';
import { CreateTaskToEmployeeDto } from '../task-employee/dto/create-task-to-employee.dto';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { ResponseDto } from '../common/response/dto/response.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
    private readonly userService: UserService,
    private readonly stockpileRepository: StockpileRepository,
    @Inject(forwardRef(() => StockpileService))
    private readonly stockpileService: StockpileService,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async verifyId(
    id: string,
    user: UserEntity,
  ): Promise<ResponseDto<TaskEntity>> {
    if (!isUUID(id)) {
      return new ResponseDto({
        message: 'Seu Id de identificação é invalido',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const task = await this.taskRepository.findOne({
      where: { id, user },
    });

    if (!task) {
      return new ResponseDto({
        message: `Tarefa com Id ${id} não foi encontrado`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: task,
    });
  }

  async isTheSameUser(
    taskUserId: string,
    userId: string,
  ): Promise<ResponseDto<TaskEntity>> {
    if (taskUserId !== userId) {
      return new ResponseDto({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Check your users credentials',
      });
    }
    return new ResponseDto({
      statusCode: HttpStatus.OK,
    });
  }

  async getTasks(
    filterDto: GetStatusFilterDto,
    user: UserEntity,
  ): Promise<ResponseDto<TaskEntity[]>> {
    const taskData = await this.taskRepository.getTasks(filterDto, user);
    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: taskData,
    });
  }

  async findOneTask(id: string, user: UserEntity): Promise<any> {
    const task = await this.verifyId(id, user);
    if (task.statusCode !== HttpStatus.OK) {
      return task;
    }
    const taskData = await this.taskRepository.findOneTask(id);
    return new ResponseDto({
      statusCode: HttpStatus.OK,
      data: taskData,
    });
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<ResponseDto<TaskEntity>> {
    const task = await this.taskRepository.createTask(createTaskDto, user);
    return new ResponseDto({
      statusCode: HttpStatus.CREATED,
      data: task,
      message: 'Tarefa criada com sucesso',
    });
  }

  async updateTask(
    id: string,
    user: UserEntity,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseDto<TaskEntity>> {
    const task = await this.verifyId(id, user);
    const { userId } = task.data;

    const isTheSameUser = await this.isTheSameUser(userId, user.id);

    if (task.statusCode !== HttpStatus.OK) {
      return task;
    }
    if (isTheSameUser.statusCode !== HttpStatus.OK) {
      return isTheSameUser;
    }

    const assignTaskUser = Object.assign(task.data, updateTaskDto);
    const storeTask = await this.taskRepository.save(assignTaskUser);
    return new ResponseDto({
      statusCode: HttpStatus.OK,
      message: 'Tarefa atualizada com sucesso',
      data: storeTask,
    });
  }

  async deleteTask(id: string, user: UserEntity): Promise<void> {
    const task = await this.verifyId(id, user);
    const { userId } = task.data;
    const isTheSameUser = await this.isTheSameUser(userId, user.id);

    if (task.statusCode !== HttpStatus.OK) {
      throw new HttpException(task.message, task.statusCode);
    }
    if (isTheSameUser.statusCode !== HttpStatus.OK) {
      throw new HttpException(isTheSameUser.message, isTheSameUser.statusCode);
    }

    return await this.taskRepository.deleteTask(id);
  }
}
