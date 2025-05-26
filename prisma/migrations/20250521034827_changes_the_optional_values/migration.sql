-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "estimateId" DROP NOT NULL,
ALTER COLUMN "phaseId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cost" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "active" BOOLEAN;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
