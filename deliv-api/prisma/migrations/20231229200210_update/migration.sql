/*
  Warnings:

  - You are about to drop the column `shipping_service_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `shipping_services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shipping_agent_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipping_service_id_fkey";

-- DropForeignKey
ALTER TABLE "shipping_services" DROP CONSTRAINT "shipping_services_user_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping_service_id",
ADD COLUMN     "shipping_agent_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "shipping_services";

-- CreateTable
CREATE TABLE "shipping_agents" (
    "shipping_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "legal_person" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "shipping_agents_pkey" PRIMARY KEY ("shipping_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shipping_agents_user_id_key" ON "shipping_agents"("user_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shipping_agent_id_fkey" FOREIGN KEY ("shipping_agent_id") REFERENCES "shipping_agents"("shipping_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_agents" ADD CONSTRAINT "shipping_agents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
