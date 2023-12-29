import { OrderPriority, OrderStatus } from '@prisma/client';

export class Order {
  id: number;
  status: OrderStatus;
  customerId: number;
  shippingServiceId: number;
  priority: OrderPriority;
  trackingCode?: string;
  closed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
