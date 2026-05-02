import { Test, TestingModule } from '@nestjs/testing';
import { ServicetypesController } from './servicetypes.controller';
import { ServicetypesService } from './servicetypes.service';

describe('ServicetypesController', () => {
  let controller: ServicetypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicetypesController],
      providers: [ServicetypesService],
    }).compile();

    controller = module.get<ServicetypesController>(ServicetypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
