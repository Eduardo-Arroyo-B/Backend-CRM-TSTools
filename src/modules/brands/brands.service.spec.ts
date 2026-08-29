import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('BrandsService', () => {
  let service: BrandsService;
  const brands = {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        { provide: PrismaService, useValue: { brands } },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns an empty collection when there are no brands', async () => {
    brands.findMany.mockResolvedValue([]);
    await expect(service.findAll('tenant-1')).resolves.toEqual([]);
  });

  it('crea una marca empresarial vinculada al tenant actual', async () => {
    brands.findFirst.mockResolvedValue(null);
    brands.create.mockResolvedValue({ id: 1, marca: 'Lenovo' });

    await service.create({ marca: 'Lenovo' }, 'user-1', 'tenant-1');

    expect(brands.findFirst).toHaveBeenCalledWith({
      where: { marca: 'Lenovo', tenantId: 'tenant-1' },
    });
    expect(brands.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { marca: 'Lenovo', usuario: 'user-1', tenantId: 'tenant-1' },
      }),
    );
  });

  it('crea una marca global sin tenant', async () => {
    brands.findFirst.mockResolvedValue(null);
    brands.create.mockResolvedValue({ id: 2, marca: 'Apple', tenantId: null });

    await service.create(
      { marca: 'Apple', esGlobal: true },
      'user-1',
      'tenant-1',
    );

    expect(brands.findFirst).toHaveBeenCalledWith({
      where: { marca: 'Apple', tenantId: null },
    });
    expect(brands.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { marca: 'Apple', usuario: 'user-1', tenantId: null },
      }),
    );
  });
});
