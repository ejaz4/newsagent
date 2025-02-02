/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `UserTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_token_key" ON "UserTokens"("token");
