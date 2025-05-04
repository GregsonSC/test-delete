/*
  Warnings:

  - The values [GRAPHICDESIGN] on the enum `Topic` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `udpatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `udpatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `udpatedAt` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketPlan" AS ENUM ('BUG', 'REQUEST', 'REVIEW', 'OTHER');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('PENDING', 'ASSIGNED', 'INPROCESS', 'UNDERREVIEW', 'SOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "TypeAttachment" AS ENUM ('IMAGE', 'DOCUMENT', 'URL', 'VIDEO', 'OTHERS');

-- CreateEnum
CREATE TYPE "StateWorkTeam" AS ENUM ('AVAILABLE', 'INACTIVE', 'ASSIGNED');

-- CreateEnum
CREATE TYPE "AreaWorkTeam" AS ENUM ('BACKEND', 'FRONTEND', 'DESIGN', 'MANAGEMENT', 'ADMINISTRATIVE', 'MARKETING', 'SALES', 'DEVOPS', 'SUPPORT');

-- AlterEnum
BEGIN;
CREATE TYPE "Topic_new" AS ENUM ('WEBDESIGN', 'DIGITALMARKETING');
ALTER TABLE "Blog" ALTER COLUMN "topic" TYPE "Topic_new" USING ("topic"::text::"Topic_new");
ALTER TYPE "Topic" RENAME TO "Topic_old";
ALTER TYPE "Topic_new" RENAME TO "Topic";
DROP TYPE "Topic_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_serviceId_fkey";

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "udpatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
ADD COLUMN     "udpatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Variant" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "udpatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "UserTicket" (
    "userId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "UserTicket_pkey" PRIMARY KEY ("userId","ticketId")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "TicketPlan" NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeAttachment" NOT NULL,
    "url" TEXT NOT NULL,
    "activityId" INTEGER,
    "ticketId" INTEGER,
    "productId" INTEGER,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "serviceAreaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" "StateWorkTeam" NOT NULL,
    "area" "AreaWorkTeam" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWorkTeam" (
    "user_id" INTEGER NOT NULL,
    "workTeam_id" INTEGER NOT NULL,

    CONSTRAINT "UserWorkTeam_pkey" PRIMARY KEY ("user_id","workTeam_id")
);

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_serviceAreaId_fkey" FOREIGN KEY ("serviceAreaId") REFERENCES "ServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkTeam" ADD CONSTRAINT "UserWorkTeam_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkTeam" ADD CONSTRAINT "UserWorkTeam_workTeam_id_fkey" FOREIGN KEY ("workTeam_id") REFERENCES "WorkTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
