import {
  createSalaryInfoSchema,
  getSingleSalaryInfoSchema,
  getSingleSalalyInfoByTermIdAndMonthSchema,
  updateSalaryInfoSchema,
  deleteSalaryInfoSchema,
} from "../../../schema/salaryInfo";
import { router, protectedProcedure } from "../trpc";

export const salaryInfoRouter = router({
  createSalaryInfo: protectedProcedure
    .input(createSalaryInfoSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.salaryInfo.create({
        data: {
          month: input.month,
          user: {
            connect: {
              //既存のデータとの関連を作る
              id: ctx.session?.user?.id,
            },
          },
          term: {
            connect: {
              //既存のデータとの関連を作る
              id: input.termId,
            },
          },
        },
      });
    }),

  getSalaryInfos: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.salaryInfo.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: { month: "desc" },
    });
  }),

  getSingleSalaryInfo: protectedProcedure
    .input(getSingleSalaryInfoSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.salaryInfo.findUnique({
        where: {
          id: input.salaryInfoId,
        },
      });
    }),

  getSingleSalalyInfoByTermIdAndMonth: protectedProcedure
    .input(getSingleSalalyInfoByTermIdAndMonthSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.salaryInfo.findFirst({
        where: {
          userId: ctx.session?.user?.id,
          termId: input.termId,
          month: input.month,
        },
      });
    }),

  updateSalaryInfo: protectedProcedure
    .input(updateSalaryInfoSchema)
    .mutation(async ({ ctx, input }) => {
      const salaryInfo = await ctx.prisma.salaryInfo.update({
        where: {
          id: input.id,
        },
        data: {
          month: input.month,
          basicSalary: input.basicSalary,
          overtimePay: input.overtimePay,
          allowances: input.allowances,
          bonus: input.bonus,
          otherSalary: input.allowances,
          incomeTax: input.incomeTax,
          residentTax: input.residentTax,
          healthInsurancePremium: input.healthInsurancePremium,
          annuityPrice: input.annuityPrice,
          employmentInsurancePremium: input.employmentInsurancePremium,
          federalLawPermits: input.federalLawPermits,
          otherDeductin: input.otherDeductin,
        },
      });
      return salaryInfo;
    }),

  deleteSalaryInfo: protectedProcedure
    .input(deleteSalaryInfoSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.salaryInfo.delete({
        where: {
          id: input.salaryInfoId,
        },
      });
    }),
});
