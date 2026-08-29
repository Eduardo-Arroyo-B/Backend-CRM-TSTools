import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { ProductsService } from './products.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  const products = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const brands = { findFirst: jest.fn() };
  const models = { findFirst: jest.fn() };

  const product = {
    id: 1,
    nombre: 'Pantalla OLED',
    sku: 'OLED-001',
    precio_publico: new Prisma.Decimal(1200),
    marcaId: null,
    modeloId: null,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: { products, brands, models } },
      ],
    }).compile();
    service = module.get(ProductsService);
  });

  it('crea un producto global con el usuario autenticado', async () => {
    products.create.mockResolvedValue(product);

    await expect(
      service.create(
        { nombre: product.nombre, sku: product.sku, precio_publico: 1200 },
        'user-1',
      ),
    ).resolves.toBe(product);
    expect(products.create).toHaveBeenCalledWith({
      data: {
        nombre: 'Pantalla OLED',
        sku: 'OLED-001',
        precio_publico: 1200,
        creadorId: 'user-1',
      },
      include: { Marca: true, Modelo: true },
    });
  });

  it('traduce un SKU duplicado a ConflictException', async () => {
    products.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Duplicado', {
        code: 'P2002',
        clientVersion: '7.6.0',
      }),
    );

    await expect(
      service.create(
        { nombre: product.nombre, sku: product.sku, precio_publico: 1200 },
        'user-1',
      ),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('lista todos los productos globales', async () => {
    products.findMany.mockResolvedValue([product]);
    await expect(service.findAll()).resolves.toEqual([product]);
    expect(products.findMany).toHaveBeenCalledWith({
      include: { Marca: true, Modelo: true },
      orderBy: { nombre: 'asc' },
    });
  });

  it('consulta un producto global por id', async () => {
    products.findUnique.mockResolvedValue(product);
    await expect(service.findOne(1)).resolves.toBe(product);
    expect(products.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  it('arroja NotFoundException si el producto global no existe', async () => {
    products.findUnique.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('actualiza un producto existente', async () => {
    products.findUnique.mockResolvedValue(product);
    products.update.mockResolvedValue({ ...product, stock: 5 });
    await expect(service.update(1, { stock: 5 })).resolves.toEqual({
      ...product,
      stock: 5,
    });
    expect(products.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { stock: 5 },
      include: { Marca: true, Modelo: true },
    });
  });

  it('elimina un producto existente', async () => {
    products.findUnique.mockResolvedValue(product);
    products.delete.mockResolvedValue(product);
    await expect(service.remove(1)).resolves.toBe(product);
    expect(products.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
