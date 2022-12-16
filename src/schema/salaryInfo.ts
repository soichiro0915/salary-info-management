import z from "zod";

export const createSalaryInfoSchema = z.object({
  month: z.number().min(1).max(12),
  termId: z.string(),
});

export type CreateSalaryInfoInput = z.TypeOf<typeof createSalaryInfoSchema>;

export const bulkCreateSalaryInfosSchema = z.array(createSalaryInfoSchema);

export type BulkCreateSalaryInfosInput = z.TypeOf<
  typeof bulkCreateSalaryInfosSchema
>;

export const updateSalaryInfoSchema = z.object({
  id: z.string().cuid(),
  month: z.number().min(1).max(12),
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
  otherDeductin: z.number().min(0).max(10000000000),
});

export type updateSalaryInfoInput = z.TypeOf<typeof updateSalaryInfoSchema>;

export const getSingleSalaryInfoSchema = z.object({
  salaryInfoId: z.string().cuid(),
});

export const getSingleSalalyInfoByTermIdAndMonthSchema = z.object({
  termId: z.string().cuid(),
  month: z.number().min(1).max(12),
});

export const deleteSalaryInfoSchema = z.object({
  salaryInfoId: z.string().cuid(),
});
