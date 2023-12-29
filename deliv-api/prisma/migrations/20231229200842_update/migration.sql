/*
  Warnings:

  - The primary key for the `shipping_agents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shipping_id` on the `shipping_agents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_agent_id_fkey";

-- AlterTable
ALTER TABLE "shipping_agents" DROP CONSTRAINT "shipping_agents_pkey",
DROP COLUMN "shipping_id",
ADD COLUMN     "agent_id" SERIAL NOT NULL,
ADD CONSTRAINT "shipping_agents_pkey" PRIMARY KEY ("agent_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_agent_id_fkey" FOREIGN KEY ("shipping_agent_id") REFERENCES "shipping_agents"("agent_id") ON DELETE RESTRICT ON UPDATE CASCADE;
