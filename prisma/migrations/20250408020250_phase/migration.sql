-- CreateEnum
CREATE TYPE "PhaseName" AS ENUM ('ANALYSIS', 'DESIGN', 'DEVELOPMENT', 'DEPLOY');

-- CreateEnum
CREATE TYPE "PhaseState" AS ENUM ('PLANNING', 'INPROCESS', 'TESTING', 'FINISHED');

-- CreateTable
CREATE TABLE "Phase" (
    "id" SERIAL NOT NULL,
    "name" "PhaseName" NOT NULL,
    "description" TEXT NOT NULL,
    "expectedDuration" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "project_id" INTEGER,
    "state" "PhaseState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
