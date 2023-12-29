import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderPriority, OrderStatus } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  shippingAgentId: number;

  @ApiProperty({ enum: OrderPriority })
  priority: OrderPriority;

  @ApiProperty({ required: false, nullable: true })
  trackingCode: string | null;

  @ApiProperty({ default: false })
  closed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
