/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `udpatedAt` on the `Attachment` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StateWorkTeam" AS ENUM ('DATOS');

-- CreateEnum
CREATE TYPE "AreaWorkTeam" AS ENUM ('DATOS');

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "UserTicket" DROP CONSTRAINT "UserTicket_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "UserTicket" DROP CONSTRAINT "UserTicket_userId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "createdAt",
DROP COLUMN "udpatedAt";

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
ALTER TABLE "UserWorkTeam" ADD CONSTRAINT "UserWorkTeam_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWorkTeam" ADD CONSTRAINT "UserWorkTeam_workTeam_id_fkey" FOREIGN KEY ("workTeam_id") REFERENCES "WorkTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
