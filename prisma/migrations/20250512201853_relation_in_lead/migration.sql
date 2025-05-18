/*
  Warnings:

  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "workTeamId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_workTeamId_fkey" FOREIGN KEY ("workTeamId") REFERENCES "WorkTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
