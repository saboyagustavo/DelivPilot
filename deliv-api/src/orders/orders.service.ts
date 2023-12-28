import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;

    const [orders, totalCount] = await Promise.all([
      this.prisma.order.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.order.count(),
    ]);

    const firstItem = skip + 1;

    const lastItem = Math.min(page * pageSize, totalCount);

    const pagination = `Showing ${firstItem} to ${lastItem} of ${totalCount} results`;

    const pagesAmount = Math.ceil(totalCount / pageSize);
    return { totalCount, pagination, pagesAmount, orders };
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
