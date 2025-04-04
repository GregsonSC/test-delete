/*
  Warnings:

  - You are about to drop the column `serviceAssocciated` on the `Permission` table. All the data in the column will be lost.
  - Added the required column `serviceAssociated` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceAssociated" AS ENUM ('NORMALUSERS', 'ADMINUSERS', 'LEADS', 'ESTIMATES', 'PROJECTS', 'BLOGS', 'PRODUCTS');

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "serviceAssocciated",
ADD COLUMN     "serviceAssociated" "ServiceAssociated" NOT NULL;

-- DropEnum
DROP TYPE "ServiceAssocciated";
