/*
  Warnings:

  - Added the required column `updatedAt` to the `Clause` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clause" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "signedDate" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyAdd" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerSignDate" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientSignDate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "leadId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractClause" (
    "contractId" INTEGER NOT NULL,
    "clauseId" INTEGER NOT NULL,

    CONSTRAINT "ContractClause_pkey" PRIMARY KEY ("contractId","clauseId")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractClause" ADD CONSTRAINT "ContractClause_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractClause" ADD CONSTRAINT "ContractClause_clauseId_fkey" FOREIGN KEY ("clauseId") REFERENCES "Clause"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
