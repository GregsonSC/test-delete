/*
  Warnings:

  - You are about to drop the column `name` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siteUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "url",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "siteUrl" TEXT NOT NULL;
