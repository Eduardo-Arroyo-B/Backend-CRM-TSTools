import { Module } from '@nestjs/common';
import { CloudfareService } from './cloudfare.service';
import { CloudfareController } from './cloudfare.controller';

@Module({
  controllers: [CloudfareController],
  providers: [CloudfareService],

  exports: [CloudfareService],
})
export class CloudfareModule {}
