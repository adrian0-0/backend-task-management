import { Test, TestingModule } from '@nestjs/testing';
import { StockpileController } from './stockpile.controller';

describe('StockpileController', () => {
  let controller: StockpileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockpileController],
    }).compile();

    controller = module.get<StockpileController>(StockpileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
