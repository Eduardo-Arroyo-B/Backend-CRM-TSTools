import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { CatalogsModule } from './catalogs/catalogs.module';

@Module({
  imports: [AuthModule, PrismaModule, OrdersModule, CatalogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
