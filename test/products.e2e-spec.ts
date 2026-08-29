import {
  CanActivate,
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import request from 'supertest';
import { App } from 'supertest/types';
import { ProductsModule } from '../src/modules/products/products.module';
import { ProductsService } from '../src/modules/products/products.service';
import { validationExceptionFactory } from '../src/common/validation/validation-exception.factory';
import { RequestWithUser } from '../src/common/utils/requestWithUser.utils';

describe('Products endpoints (e2e)', () => {
  let app: INestApplication<App>;
  const product = { id: 1, nombre: 'Pantalla OLED', sku: 'OLED-001' };
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const guard: CanActivate = {
    canActivate(context: ExecutionContext) {
      context.switchToHttp().getRequest<RequestWithUser>().user = {
        id: 'user-1',
        usuario: 'test',
        tenantId: 'tenant-1',
        logoURL: '',
      };
      return true;
    },
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [ProductsModule] })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(guard)
      .overrideProvider(ProductsService)
      .useValue(service)
      .compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: validationExceptionFactory,
      }),
    );
    await app.init();
  });

  beforeEach(() => jest.clearAllMocks());
  afterAll(async () => app.close());

  it('ejecuta POST', async () => {
    service.create.mockResolvedValue(product);
    await request(app.getHttpServer())
      .post('/api/v1/products')
      .send({ nombre: 'Pantalla OLED', sku: 'OLED-001', precio_publico: 100 })
      .expect(201);
    expect(service.create).toHaveBeenCalledWith(
      expect.objectContaining({ sku: 'OLED-001' }),
      'user-1',
    );
  });

  it('valida campos de POST', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/products')
      .send({ nombre: '', sku: '', precio_publico: -1 })
      .expect(400);
    expect(service.create).not.toHaveBeenCalled();
  });

  it('ejecuta GET de colección', async () => {
    service.findAll.mockResolvedValue([product]);
    await request(app.getHttpServer()).get('/api/v1/products').expect(200);
    expect(service.findAll).toHaveBeenCalledWith();
  });

  it('ejecuta GET por id y rechaza ids inválidos', async () => {
    service.findOne.mockResolvedValue(product);
    await request(app.getHttpServer()).get('/api/v1/products/1').expect(200);
    expect(service.findOne).toHaveBeenCalledWith(1);
    await request(app.getHttpServer()).get('/api/v1/products/abc').expect(400);
  });

  it('ejecuta PATCH', async () => {
    service.update.mockResolvedValue({ ...product, stock: 5 });
    await request(app.getHttpServer())
      .patch('/api/v1/products/1')
      .send({ stock: 5 })
      .expect(200);
    expect(service.update).toHaveBeenCalledWith(1, { stock: 5 });
  });

  it('ejecuta DELETE', async () => {
    service.remove.mockResolvedValue(product);
    await request(app.getHttpServer()).delete('/api/v1/products/1').expect(200);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
