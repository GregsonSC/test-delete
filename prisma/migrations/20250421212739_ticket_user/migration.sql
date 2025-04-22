/*
  Warnings:

  - The values [Arrive] on the enum `TicketPlan` will be removed. If these variants are still used in the database, this will fail.
  - The values [LISTO] on the enum `TicketStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `udpatedAt` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `udpatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `udpatedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `udpatedAt` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeAttachment" AS ENUM ('IMAGE', 'DOCUMENT', 'URL', 'VIDEO', 'OTHERS');

-- AlterEnum
BEGIN;
CREATE TYPE "TicketPlan_new" AS ENUM ('BUG', 'REQUEST', 'REVIEW', 'OTHER');
ALTER TABLE "Ticket" ALTER COLUMN "type" TYPE "TicketPlan_new" USING ("type"::text::"TicketPlan_new");
ALTER TYPE "TicketPlan" RENAME TO "TicketPlan_old";
ALTER TYPE "TicketPlan_new" RENAME TO "TicketPlan";
DROP TYPE "TicketPlan_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TicketStatus_new" AS ENUM ('PENDING', 'ASSIGNED', 'INPROCESS', 'UNDERREVIEW', 'SOLVED', 'CLOSED');
ALTER TABLE "Ticket" ALTER COLUMN "status" TYPE "TicketStatus_new" USING ("status"::text::"TicketStatus_new");
ALTER TYPE "TicketStatus" RENAME TO "TicketStatus_old";
ALTER TYPE "TicketStatus_new" RENAME TO "TicketStatus";
DROP TYPE "TicketStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "udpatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "udpatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TypeAttachment" NOT NULL,
    "url" TEXT NOT NULL,
    "activityId" INTEGER,
    "ticketId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,

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

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicket" ADD CONSTRAINT "UserTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_serviceAreaId_fkey" FOREIGN KEY ("serviceAreaId") REFERENCES "ServiceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
