import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import cookieParser from 'cookie-parser';
import { validationExceptionFactory } from './common/validation/validation-exception.factory';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.set('trust proxy', 1);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://crmtstools.netlify.app',
      'https://frontend-crm-cykoi.ondigitalocean.app',
      'https://crm.tsmovil.app',
    ],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );

  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
