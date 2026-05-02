import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ClientsModule } from './modules/clients/clients.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ModelsModule } from './modules/models/models.module';
import { ServicesModule } from './modules/services/services.module';
import { DevicesModule } from './modules/devices/devices.module';
import { ConceptModule } from './modules/concept/concept.module';
import { ServicetypesModule } from './modules/servicetypes/servicetypes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    OrdersModule,
    CatalogsModule,
    ClientsModule,
    BrandsModule,
    ModelsModule,
    ServicesModule,
    DevicesModule,
    ConceptModule,
    ServicetypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
