/*
  Warnings:

  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currentPhase` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimate_id` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedDuration` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CurrentPhase" AS ENUM ('ANALYSIS', 'DESIGN', 'DEVELOPMENT', 'DEPLOY');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('CREATED', 'PROCESSING', 'INREVIEW', 'REJECTED', 'ACCEPTED', 'INVOICE', 'PAID');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentPhase" "CurrentPhase" NOT NULL,
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "estimate_id" INTEGER NOT NULL,
ADD COLUMN     "expectedDuration" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL;

-- DropTable
DROP TABLE "Invoice";

-- CreateTable
CREATE TABLE "Estimate" (
    "id" SERIAL NOT NULL,
    "estimatedTime" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "Estimate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
