import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderEntity })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('/all/pagination/:page/:pageSize')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findAllPagination(
    @Param('page', ParseIntPipe) page?: number,
    @Param('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    return this.ordersService.findAllFetchPagination(page, pageSize);
  }

  @Get('/all/:page/:pageSize')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findAll(
    @Param('page', ParseIntPipe) page?: number,
    @Param('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    return this.ordersService.findAll(page, pageSize);
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order id '${id}' does not exist`);
    }
    return order;
  }

  @Patch(':id')
  @ApiOkResponse({ type: OrderEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }
}
