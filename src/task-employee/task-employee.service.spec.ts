import { Test, TestingModule } from '@nestjs/testing';
import { TaskEmployeeService } from './task-employee.service';

describe('TaskEmployeeService', () => {
  let service: TaskEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskEmployeeService],
    }).compile();

    service = module.get<TaskEmployeeService>(TaskEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
