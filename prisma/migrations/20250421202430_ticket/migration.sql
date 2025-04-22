-- CreateEnum
CREATE TYPE "TicketPlan" AS ENUM ('Arrive');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('LISTO');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "TicketPlan" NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
