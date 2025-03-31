-- CreateEnum
CREATE TYPE "State" AS ENUM ('send', 'processing', 'estimating', 'finished');

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "starDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
