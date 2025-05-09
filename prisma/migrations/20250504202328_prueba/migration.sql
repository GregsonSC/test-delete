/*
  Warnings:

  - Added the required column `updatedAt` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "projectupdate_id" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Estimate" ADD COLUMN     "plan_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_projectupdate_id_fkey" FOREIGN KEY ("projectupdate_id") REFERENCES "ProjectUpdate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
