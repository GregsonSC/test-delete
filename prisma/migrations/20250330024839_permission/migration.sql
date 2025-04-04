/*
  Warnings:

  - Added the required column `action` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceAssocciated` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('GET', 'CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "ServiceAssocciated" AS ENUM ('NORMALUSERS', 'ADMINUSERS', 'LEADS', 'ESTIMATES', 'PROJECTS', 'BLOGS', 'PRODUCTS');

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "action" "Action" NOT NULL,
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "serviceAssocciated" "ServiceAssocciated" NOT NULL;
