-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "ArticleSource" ADD COLUMN     "misinfoScore" DOUBLE PRECISION;
