import z from "zod";

export const createSalaryInfoSchema = z.object({
  year: z.number().min(4).max(4),
  month: z.number().min(2).max(2),
  basicSalary: z.number().min(0).max(10000000000),
  overtimePay: z.number().min(0).max(10000000000),
  allowances: z.number().min(0).max(10000000000),
  bonus: z.number().min(0).max(10000000000),
  otherSalary: z.number().min(0).max(10000000000),
  incomeTax: z.number().min(0).max(10000000000),
  residentTax: z.number().min(0).max(10000000000),
  healthInsurancePremium: z.number().min(0).max(10000000000),
  annuityPrice: z.number().min(0).max(10000000000),
  employmentInsurancePremium: z.number().min(0).max(10000000000),
  federalLawPermits: z.number().min(0).max(10000000000),
  otheDeducting: z.number().min(0).max(10000000000),
});

export type CreateSalaryInfoInput = z.TypeOf<typeof createSalaryInfoSchema>;

export const updateSalaryInfoSchema = z.object({
  salaryInfoId: z.string().cuid(),
  year: z.number().min(4).max(4),
  month: z.number().min(2).max(2),
  basicSalary: z.number().min(0).max(10000000000),
  overtimePay: z.number().min(0).max(10000000000),
  allowances: z.number().min(0).max(10000000000),
  bonus: z.number().min(0).max(10000000000),
  otherSalary: z.number().min(0).max(10000000000),
  incomeTax: z.number().min(0).max(10000000000),
  residentTax: z.number().min(0).max(10000000000),
  healthInsurancePremium: z.number().min(0).max(10000000000),
  annuityPrice: z.number().min(0).max(10000000000),
  employmentInsurancePremium: z.number().min(0).max(10000000000),
  federalLawPermits: z.number().min(0).max(10000000000),
  otheDeducting: z.number().min(0).max(10000000000),
});

export type updateSalaryInfoInput = z.TypeOf<typeof updateSalaryInfoSchema>;

export const getSingleSalaryInfoSchema = z.object({
  salaryInfoId: z.string().cuid(),
});

export const deleteSalaryInfoSchema = z.object({
  salaryInfoId: z.string().cuid(),
});
