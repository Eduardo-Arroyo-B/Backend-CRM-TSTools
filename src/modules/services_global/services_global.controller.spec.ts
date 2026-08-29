import { Test, TestingModule } from '@nestjs/testing';
import { ServicesGlobalController } from './services_global.controller';
import { ServicesGlobalService } from './services_global.service';

describe('ServicesGlobalController', () => {
  let controller: ServicesGlobalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesGlobalController],
      providers: [
        {
          provide: ServicesGlobalService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ServicesGlobalController>(ServicesGlobalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
