import { Test, TestingModule } from '@nestjs/testing';
import { StockpileService } from './stockpile.service';

describe('StockpileService', () => {
  let service: StockpileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockpileService],
    }).compile();

    service = module.get<StockpileService>(StockpileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
