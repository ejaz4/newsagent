/*
  Warnings:

  - A unique constraint covering the columns `[rssFeed]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "favicon" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Source_rssFeed_key" ON "Source"("rssFeed");
