import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({ data: createOrderDto });
  }

  async findAll(page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;

    const orders = await this.prisma.order.findMany({
      skip,
      take: pageSize,
      include: {
        shippingService: {
          select: {
            id: true,
            user: { select: { name: true } },
          },
        },
      },
    });

    const { pagination, pagesAmount, totalCount } =
      await this.findAllFetchPagination(page, pageSize);

    return { totalCount, pagination, pagesAmount, orders };
  }

  async findAllFetchPagination(page = 1, pageSize = 10) {
    const totalCount = await this.prisma.order.count();

    const firstItem = Math.min((page - 1) * pageSize + 1, totalCount);
    const lastItem = Math.min(page * pageSize, totalCount);

    const pagination = `Showing ${firstItem} to ${lastItem} of ${totalCount} results`;

    const pagesAmount = Math.ceil(totalCount / pageSize);
    return { totalCount, pagination, pagesAmount };
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }
}
