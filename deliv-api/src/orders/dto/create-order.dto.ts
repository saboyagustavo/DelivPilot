import { OrderStatus, OrderPriority } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateOrderDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  shippingAgentId: number;

  @ApiProperty({ enum: OrderPriority })
  @IsEnum(OrderPriority)
  priority: OrderPriority;

  @ApiProperty({
    required: false,
    nullable: true,
    default: faker.string.uuid().substring(0, 20).toUpperCase(),
  })
  @IsString()
  @IsOptional()
  trackingCode?: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  closed?: boolean = false;
}
