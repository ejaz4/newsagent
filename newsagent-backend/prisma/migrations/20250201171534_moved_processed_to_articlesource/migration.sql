/*
  Warnings:

  - You are about to drop the column `isProcessed` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `sourceLink` on the `ArticleSource` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ArticleSource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "isProcessed",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ArticleSource" DROP COLUMN "sourceLink",
ADD COLUMN     "articleDescription" TEXT,
ADD COLUMN     "articleImage" TEXT,
ADD COLUMN     "articlePublishedAt" TIMESTAMP(3),
ADD COLUMN     "articleTitle" TEXT,
ADD COLUMN     "articleUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isProcessed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
