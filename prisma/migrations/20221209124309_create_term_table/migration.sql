/*
  Warnings:

  - You are about to drop the column `year` on the `SalaryInfo` table. All the data in the column will be lost.
  - Added the required column `termId` to the `SalaryInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalaryInfo" DROP COLUMN "year",
ADD COLUMN     "termId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Term_id_key" ON "Term"("id");

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryInfo" ADD CONSTRAINT "SalaryInfo_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
