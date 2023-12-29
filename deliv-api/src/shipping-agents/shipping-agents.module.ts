import { Module } from '@nestjs/common';
import { ShippingAgentsService } from './shipping-agents.service';
import { ShippingAgentsController } from './shipping-agents.controller';

@Module({
  controllers: [ShippingAgentsController],
  providers: [ShippingAgentsService],
  exports: [ShippingAgentsService],
})
export class ShippingAgentsModule {}
