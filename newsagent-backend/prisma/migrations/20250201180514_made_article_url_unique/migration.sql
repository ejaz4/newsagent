/*
  Warnings:

  - A unique constraint covering the columns `[articleUrl]` on the table `ArticleSource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ArticleSource_articleUrl_key" ON "ArticleSource"("articleUrl");
