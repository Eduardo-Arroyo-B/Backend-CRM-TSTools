import { HttpException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ModelsService } from './models.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ModelsService', () => {
  let service: ModelsService;
  const models = {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const brands = { findFirst: jest.fn() };
  const model = {
    id: 7,
    nombre: 'Modelo X',
    brandId: 3,
    tenantId: 'tenant-1',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        ModelsService,
        { provide: PrismaService, useValue: { models, brands } },
      ],
    }).compile();
    service = module.get(ModelsService);
  });

  it('crea un modelo vinculado a una marca del tenant', async () => {
    brands.findFirst.mockResolvedValue({ id: 3 });
    models.findFirst.mockResolvedValue(null);
    models.create.mockResolvedValue(model);
    await expect(
      service.create({ nombre: 'Modelo X', brandId: 3 }, 'user-1', 'tenant-1'),
    ).resolves.toBe(model);
    expect(models.create).toHaveBeenCalledWith({
      data: {
        nombre: 'Modelo X',
        brandId: 3,
        usuarioId: 'user-1',
        tenantId: 'tenant-1',
      },
      select: {
        id: true,
        nombre: true,
        Usuario: { select: { usuario: true } },
        Marca: { select: { id: true, marca: true } },
        brandId: true,
        tenantId: true,
      },
    });
  });

  it('rechaza una marca que no sea global ni pertenezca al tenant', async () => {
    brands.findFirst.mockResolvedValue(null);
    await expect(
      service.create({ nombre: 'Modelo X', brandId: 3 }, 'user-1', 'tenant-1'),
    ).rejects.toBeInstanceOf(HttpException);
    expect(models.create).not.toHaveBeenCalled();
  });

  it('permite crear un modelo empresarial usando una marca global', async () => {
    brands.findFirst.mockResolvedValue({ id: 3 });
    models.findFirst.mockResolvedValue(null);
    models.create.mockResolvedValue(model);

    await service.create(
      { nombre: 'Modelo X', brandId: 3 },
      'user-1',
      'tenant-1',
    );

    expect(brands.findFirst).toHaveBeenCalledWith({
      where: {
        id: 3,
        OR: [{ tenantId: null }, { tenantId: 'tenant-1' }],
      },
      select: { id: true },
    });
    expect(models.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ tenantId: 'tenant-1', brandId: 3 }),
      }),
    );
  });

  it('detecta duplicados por nombre, marca y tenant', async () => {
    brands.findFirst.mockResolvedValue({ id: 3 });
    models.findFirst.mockResolvedValue(model);
    await expect(
      service.create({ nombre: 'Modelo X', brandId: 3 }, 'user-1', 'tenant-1'),
    ).rejects.toBeInstanceOf(HttpException);
    expect(models.findFirst).toHaveBeenCalledWith({
      where: { nombre: 'Modelo X', brandId: 3, tenantId: 'tenant-1' },
    });
  });

  it('lista modelos globales y del tenant con su marca', async () => {
    models.findMany.mockResolvedValue([model]);
    await expect(service.findAll('tenant-1')).resolves.toEqual([model]);
    expect(models.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { OR: [{ tenantId: null }, { tenantId: 'tenant-1' }] },
      }),
    );
  });

  it('actualiza un modelo existente sin duplicarlo', async () => {
    models.findUnique.mockResolvedValue(model);
    models.findFirst.mockResolvedValue(null);
    models.update.mockResolvedValue({ ...model, nombre: 'Modelo Y' });
    await expect(
      service.update(7, { nombre: 'Modelo Y' }, 'tenant-1'),
    ).resolves.toEqual({ ...model, nombre: 'Modelo Y' });
  });

  it('elimina un modelo existente', async () => {
    models.findUnique.mockResolvedValue(model);
    models.delete.mockResolvedValue(model);
    await expect(service.remove(7, 'tenant-1')).resolves.toBe(model);
  });

  it('oculta modelos que no pertenecen al tenant', async () => {
    models.findUnique.mockResolvedValue(null);
    await expect(service.findOne(7, 'tenant-2')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
