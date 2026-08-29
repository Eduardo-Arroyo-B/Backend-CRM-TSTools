import { Test, TestingModule } from '@nestjs/testing';
import { ServicesGlobalService } from './services_global.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ServicesGlobalService', () => {
  let service: ServicesGlobalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesGlobalService,
        {
          provide: PrismaService,
          useValue: { globalService: {} },
        },
      ],
    }).compile();

    service = module.get<ServicesGlobalService>(ServicesGlobalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
