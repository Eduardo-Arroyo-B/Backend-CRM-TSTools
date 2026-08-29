import { Module } from '@nestjs/common';
import { ServicesGlobalService } from './services_global.service';
import { ServicesGlobalController } from './services_global.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServicesGlobalController],
  providers: [ServicesGlobalService],
})
export class ServicesGlobalModule {}
