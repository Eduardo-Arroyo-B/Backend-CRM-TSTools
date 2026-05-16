import { Test, TestingModule } from '@nestjs/testing';
import { CloudfareService } from './cloudfare.service';

describe('CloudfareService', () => {
  let service: CloudfareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudfareService],
    }).compile();

    service = module.get<CloudfareService>(CloudfareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
