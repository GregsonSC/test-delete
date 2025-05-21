-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Variant" ALTER COLUMN "description" DROP NOT NULL;
