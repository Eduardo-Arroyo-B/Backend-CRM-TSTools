import { Module } from '@nestjs/common';
import { ServicetypesService } from './servicetypes.service';
import { ServicetypesController } from './servicetypes.controller';

@Module({
  controllers: [ServicetypesController],
  providers: [ServicetypesService],
})
export class ServicetypesModule {}
