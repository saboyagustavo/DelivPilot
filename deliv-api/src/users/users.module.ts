import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomersModule } from 'src/customers/customers.module';
import { ShippingAgentsModule } from 'src/shipping-agents/shipping-agents.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, CustomersModule, ShippingAgentsModule],
})
export class UsersModule {}
