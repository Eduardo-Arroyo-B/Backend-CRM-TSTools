import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { CloudfareModule } from '../cloudfare/cloudfare.module';

@Module({
  imports: [CloudfareModule],

  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
