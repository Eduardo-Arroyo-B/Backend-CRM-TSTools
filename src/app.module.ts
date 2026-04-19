import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    OrdersModule,
    CatalogsModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
