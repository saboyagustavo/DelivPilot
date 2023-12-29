import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { ShippingServicesModule } from './shipping-services/shipping-services.module';

@Module({
  imports: [PrismaModule, OrdersModule, UsersModule, CustomersModule, ShippingServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
