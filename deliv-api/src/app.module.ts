import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { ShippingAgentsModule } from './shipping-agents/shipping-agents.module';

@Module({
  imports: [
    PrismaModule,
    OrdersModule,
    UsersModule,
    CustomersModule,
    ShippingAgentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
