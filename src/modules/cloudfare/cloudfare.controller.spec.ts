import { Test, TestingModule } from '@nestjs/testing';
import { CloudfareController } from './cloudfare.controller';
import { CloudfareService } from './cloudfare.service';

describe('CloudfareController', () => {
  let controller: CloudfareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudfareController],
      providers: [CloudfareService],
    }).compile();

    controller = module.get<CloudfareController>(CloudfareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
