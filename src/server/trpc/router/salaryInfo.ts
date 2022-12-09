import {
  createSalaryInfoSchema,
  getSingleSalaryInfoSchema,
  updateSalaryInfoSchema,
  deleteSalaryInfoSchema,
} from "../../../schema/salaryInfo";
import { router, protectedProcedure } from "../trpc";

export const salaryInfoRouter = router({
  createSalaryInfo: protectedProcedure
    .input(createSalaryInfoSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(111111111)
      console.log(input)
      console.log(2222222222)
      const salaryInfo = await ctx.prisma.salaryInfo.create({
        data: {
          ...input,
          user: {
            connect: {
              //既存のデータとの関連を作る
              id: ctx.session?.user?.id,
            },
          },
        },
      });
      return salaryInfo;
    }),

  getSalaryInfos: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.salaryInfo.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: {
        year: "desc",
        month: "desc",
      },
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

  updateSalaryInfo: protectedProcedure
    .input(updateSalaryInfoSchema)
    .mutation(async ({ ctx, input }) => {
      const salaryInfo = await ctx.prisma.salaryInfo.update({
        where: {
          id: input.salaryInfoId,
        },
        data: {
          year: input.year,
          month: input.month,
          basicSalary: input.basicSalary,
          overtimePay: input.overtimePay,
          allowances: input.allowances,
          bonus: input.bonus,
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
