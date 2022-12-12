import {
  createTermSchema,
  getSingleTermSchema,
  updateTermSchema,
  deleteTermSchema,
} from "../../../schema/term";
import { router, protectedProcedure } from "../trpc";

export const termRouter = router({
  createTerm: protectedProcedure
    .input(createTermSchema)
    .mutation(async ({ ctx, input }) => {
      const term = await ctx.prisma.term.create({
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
      return term;
    }),

  getTerms: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.term.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy: { year: "desc" },
    });
  }),

  getSingleTerm: protectedProcedure
    .input(getSingleTermSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.term.findUnique({
        where: {
          id: input.termId,
        },
      });
    }),

  updateTerm: protectedProcedure
    .input(updateTermSchema)
    .mutation(async ({ ctx, input }) => {
      const term = await ctx.prisma.term.update({
        where: {
          id: input.termId,
        },
        data: {
          year: input.year,
        },
      });
      return term;
    }),

  deleteTerm: protectedProcedure
    .input(deleteTermSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.term.delete({
        where: {
          id: input.termId,
        },
      });
    }),
});
