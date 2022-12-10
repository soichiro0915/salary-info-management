/*
  Warnings:

  - A unique constraint covering the columns `[userId,year]` on the table `Term` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Term_userId_year_key" ON "Term"("userId", "year");
