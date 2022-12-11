/*
  Warnings:

  - A unique constraint covering the columns `[termId,month]` on the table `SalaryInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SalaryInfo" ALTER COLUMN "basicSalary" SET DEFAULT 0,
ALTER COLUMN "overtimePay" SET DEFAULT 0,
ALTER COLUMN "allowances" SET DEFAULT 0,
ALTER COLUMN "bonus" SET DEFAULT 0,
ALTER COLUMN "otherSalary" SET DEFAULT 0,
ALTER COLUMN "incomeTax" SET DEFAULT 0,
ALTER COLUMN "residentTax" SET DEFAULT 0,
ALTER COLUMN "healthInsurancePremium" SET DEFAULT 0,
ALTER COLUMN "annuityPrice" SET DEFAULT 0,
ALTER COLUMN "employmentInsurancePremium" SET DEFAULT 0,
ALTER COLUMN "federalLawPermits" SET DEFAULT 0,
ALTER COLUMN "otherDeductin" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "SalaryInfo_termId_month_key" ON "SalaryInfo"("termId", "month");
