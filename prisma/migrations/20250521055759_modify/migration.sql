/*
  Warnings:

  - You are about to drop the column `currentPhase` on the `Project` table. All the data in the column will be lost.
  - Made the column `phase_id` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Blog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lead_id` on table `Estimate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serviceId` on table `Lead` required. This step will fail if there are existing NULL values in that column.
  - Made the column `project_id` on table `Phase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phaseId` on table `ProjectUpdate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `service_id` on table `ServiceArea` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "expectedDuration" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "phase_id" SET NOT NULL,
ALTER COLUMN "priority" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Estimate" ALTER COLUMN "estimatedTime" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "lead_id" SET NOT NULL,
ALTER COLUMN "totalValue" DROP NOT NULL,
ALTER COLUMN "deadLineToPay" DROP NOT NULL,
ALTER COLUMN "invoiceDateCreated" DROP NOT NULL,
ALTER COLUMN "invoiceReference" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "serviceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Phase" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "project_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "currentPhase",
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "imagePreviewUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProjectUpdate" ALTER COLUMN "phaseId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceArea" ALTER COLUMN "service_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkTeam" ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
