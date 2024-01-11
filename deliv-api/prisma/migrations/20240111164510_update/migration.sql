/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipping_agents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_agent_id_fkey";

-- DropForeignKey
ALTER TABLE "shipping_agents" DROP CONSTRAINT "shipping_agents_user_id_fkey";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "shipping_agents";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_agent_id_fkey" FOREIGN KEY ("shipping_agent_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
