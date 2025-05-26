/*
  Warnings:

  - You are about to drop the column `MainTitle` on the `ServiceArea` table. All the data in the column will be lost.
  - You are about to drop the column `SubTitle` on the `ServiceArea` table. All the data in the column will be lost.
  - Made the column `serviceAreaId` on table `Benefit` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `mainTitle` to the `ServiceArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTitle` to the `ServiceArea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Benefit" ALTER COLUMN "serviceAreaId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceArea" DROP COLUMN "MainTitle",
DROP COLUMN "SubTitle",
ADD COLUMN     "mainTitle" TEXT NOT NULL,
ADD COLUMN     "subTitle" TEXT NOT NULL;
