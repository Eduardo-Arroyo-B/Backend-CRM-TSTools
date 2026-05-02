import { Test, TestingModule } from '@nestjs/testing';
import { ServicetypesService } from './servicetypes.service';

describe('ServicetypesService', () => {
  let service: ServicetypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicetypesService],
    }).compile();

    service = module.get<ServicetypesService>(ServicetypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
