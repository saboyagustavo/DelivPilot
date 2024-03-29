import { PrismaClient, Role, OrderStatus, OrderPriority } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createRandomUser(role: Role) {
  const hashedPassword = await bcrypt.hash(
    faker.internet.password({ length: 12, memorable: true }),
    10,
  );

  const user = await prisma.user.create({
    data: {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role,
    },
  });

  return user;
}

async function createRandomOrder(
  customer: any,
  shippingAgent: any,
  priority: OrderPriority,
  status: OrderStatus,
) {
  const closedOrderStatuses = ['SHIPPED', 'CANCELLED', 'REJECTED'];
  const isClosed = closedOrderStatuses.includes(status);

  const order = await prisma.order.create({
    data: {
      status: status,
      customer: { connect: { id: customer.id } },
      shippingAgent: { connect: { id: shippingAgent.id } },
      priority,
      trackingCode: faker.string.uuid().substring(0, 20).toUpperCase(),
      closed: isClosed,
    },
  });
  return order;
}

async function seedDatabase() {
  const customerPromises = Array.from({ length: 50 }, async () => {
    return await createRandomUser(Role.USER);
  });

  const shippingAgentPromises = Array.from({ length: 50 }, async () => {
    return await createRandomUser(Role.ADMIN);
  });

  const [customers, shippingAgents] = await Promise.all([
    Promise.all(customerPromises),
    Promise.all(shippingAgentPromises),
  ]);

  const orderPromises = Array.from({ length: 100 }, () => {
    const randomCustomer =
      customers[Math.floor(Math.random() * customers.length)];

    const randomShippingAgent =
      shippingAgents[Math.floor(Math.random() * shippingAgents.length)];

    const randomPriority =
      Object.values(OrderPriority)[
        Math.floor(Math.random() * Object.values(OrderPriority).length)
      ];

    const randomStatus =
      Object.values(OrderStatus)[
        Math.floor(Math.random() * Object.values(OrderStatus).length)
      ];

    return createRandomOrder(
      randomCustomer,
      randomShippingAgent,
      randomPriority,
      randomStatus,
    );
  });

  await Promise.all(orderPromises);

  console.log('Database seeded successfully');
}

seedDatabase()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
