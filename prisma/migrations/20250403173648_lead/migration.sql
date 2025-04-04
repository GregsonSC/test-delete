-- CreateEnum
CREATE TYPE "State" AS ENUM ('SEND', 'PROCESSING', 'ESTIMATING', 'FINISHED');

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT,
    "clientEmail" TEXT,
    "clientPhone" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "starDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
