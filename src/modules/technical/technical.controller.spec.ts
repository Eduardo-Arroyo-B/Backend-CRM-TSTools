import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalController } from './technical.controller';
import { TechnicalService } from './technical.service';

describe('TechnicalController', () => {
  let controller: TechnicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicalController],
      providers: [TechnicalService],
    }).compile();

    controller = module.get<TechnicalController>(TechnicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
