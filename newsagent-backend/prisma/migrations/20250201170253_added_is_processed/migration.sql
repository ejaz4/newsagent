-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "isProcessed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "content" DROP NOT NULL;
