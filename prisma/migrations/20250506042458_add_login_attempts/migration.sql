/*
  Warnings:

  - Added the required column `ContentImageUrl` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImageReference` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImageSubTitle` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SubTitle` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MainTitle` to the `ServiceArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SubTitle` to the `ServiceArea` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "ContentImageUrl" TEXT NOT NULL,
ADD COLUMN     "ImageReference" TEXT NOT NULL,
ADD COLUMN     "ImageSubTitle" TEXT NOT NULL,
ADD COLUMN     "SubTitle" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "ServiceArea" ADD COLUMN     "MainTitle" TEXT NOT NULL,
ADD COLUMN     "SubTitle" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "email" TEXT,
    "success" BOOLEAN NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
