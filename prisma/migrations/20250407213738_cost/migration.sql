/*
  Warnings:

  - Made the column `lead_id` on table `Estimate` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CostType" AS ENUM ('MANPOWER', 'TECHNOLOGIES', 'LICENSE', 'OTHERS');

-- DropForeignKey
ALTER TABLE "Estimate" DROP CONSTRAINT "Estimate_lead_id_fkey";

-- AlterTable
ALTER TABLE "Estimate" ALTER COLUMN "lead_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "Cost" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "CostType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "estimateId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_estimateId_fkey" FOREIGN KEY ("estimateId") REFERENCES "Estimate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
