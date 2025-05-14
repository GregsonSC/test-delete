/*
  Warnings:

  - Added the required column `priority` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadLineToPay` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceDateCreated` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceReference` to the `Estimate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientAddress` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "priority" "Priority" NOT NULL;

-- AlterTable
ALTER TABLE "Estimate" ADD COLUMN     "deadLineToPay" TEXT NOT NULL,
ADD COLUMN     "invoiceDateCreated" TEXT NOT NULL,
ADD COLUMN     "invoiceReference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "clientAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imageUrl" DROP NOT NULL;
