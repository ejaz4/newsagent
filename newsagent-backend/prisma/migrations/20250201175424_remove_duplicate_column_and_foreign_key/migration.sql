/*
  Warnings:

  - You are about to drop the column `userId` on the `Source` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_userId_fkey";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "userId";
