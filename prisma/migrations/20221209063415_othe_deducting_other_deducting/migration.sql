/*
  Warnings:

  - You are about to drop the column `otheDeducting` on the `SalaryInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalaryInfo" DROP COLUMN "otheDeducting",
ADD COLUMN     "otherDeductin" INTEGER;
