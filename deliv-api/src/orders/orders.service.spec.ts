import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrdersService } from './orders.service';
import { faker } from '@faker-js/faker';
import { OrderPriority, OrderStatus, Role } from '@prisma/client';

async function generateMockUser(role: Role) {
  return {
    id: faker.number.int({ min: 10, max: 100 }),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    role,
  };
}

async function generateMockUserCategory(user) {
  switch (user.role) {
    case Role.ADMIN: {
      return {
        id: faker.number.int({ min: 10, max: 100 }),
        userId: user.id,
        legalPerson: Math.random() < 0.5,
      };
    }
    case Role.USER: {
      return {
        id: faker.number.int({ min: 10, max: 100 }),
        userId: user.id,
        legalPerson: Math.random() < 0.5,
      };
    }
    default:
      return;
  }
}

function generateMockOrder(
  customer: any,
  shippingService: any,
  priority: OrderPriority,
  status: OrderStatus,
) {
  const closedOrderStatuses = ['SHIPPED', 'CANCELLED', 'REJECTED'];
  const isClosed = closedOrderStatuses.includes(status);
  return {
    status: status,
    customerId: customer.id,
    shippingServiceId: shippingService.id,
    priority,
    trackingCode: faker.string.uuid().substring(0, 20).toUpperCase(),
    closed: isClosed,
  };
}

function generateMockDataForOrder() {
  const customers = Array.from({ length: 25 }, async () => {
    const user = await generateMockUser(Role.USER);
    const customer = await generateMockUserCategory(user);
    return customer;
  });

  const shippingServices = Array.from({ length: 25 }, async () => {
    const user = await generateMockUser(Role.ADMIN);
    const shippingService = await generateMockUserCategory(user);
    return shippingService;
  });

  const randomCustomer =
    customers[Math.floor(Math.random() * customers.length)];

  const randomShippingService =
    shippingServices[Math.floor(Math.random() * shippingServices.length)];

  const randomPriority =
    Object.values(OrderPriority)[
      Math.floor(Math.random() * Object.values(OrderPriority).length)
    ];

  const randomStatus =
    Object.values(OrderStatus)[
      Math.floor(Math.random() * Object.values(OrderStatus).length)
    ];

  return generateMockOrder(
    randomCustomer,
    randomShippingService,
    randomPriority,
    randomStatus,
  );
}

describe('OrdersService', () => {
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: {
            order: {
              findMany: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  describe('findAll', () => {
    it('should return orders with pagination information', async () => {
      const mockOrders = generateMockDataForOrder();
      const mockTotalCount = 50;

      jest
        .spyOn(ordersService['prisma'].order, 'findMany')
        .mockResolvedValueOnce(mockOrders);

      jest
        .spyOn(ordersService['prisma'].order, 'count')
        .mockResolvedValueOnce(mockTotalCount);

      const result = await ordersService.findAll(1, 10);

      expect(result).toEqual({
        totalCount: mockTotalCount,
        pagination: 'Showing 1 to 10 of 50 results',
        pagesAmount: 5,
        orders: mockOrders,
      });
    });
  });

  describe('findAllFetchPagination', () => {
    it('should return pagination information', async () => {
      const mockTotalCount = 50;

      jest
        .spyOn(ordersService['prisma'].order, 'count')
        .mockResolvedValueOnce(mockTotalCount);

      const result = await ordersService.findAllFetchPagination(1, 10);

      expect(result).toEqual({
        totalCount: mockTotalCount,
        pagination: 'Showing 1 to 10 of 50 results',
        pagesAmount: 5,
      });
    });
  });
});
