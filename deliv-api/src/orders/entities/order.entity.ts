import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderPriority, OrderStatus } from '@prisma/client';
import { UserEntity } from 'src/users/entities/user.entity';

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

  @ApiProperty({ required: false, type: UserEntity })
  customer?: UserEntity;

  @ApiProperty({ required: false, type: UserEntity })
  shippingAgent?: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({ customer, shippingAgent, ...data }: Partial<OrderEntity>) {
    Object.assign(this, data);
    if (customer) {
      this.customer = new UserEntity(customer);
    }

    if (shippingAgent) {
      this.shippingAgent = new UserEntity(shippingAgent);
    }
  }
}
