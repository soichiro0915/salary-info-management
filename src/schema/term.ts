import z from "zod";
import dayjs from "dayjs";

const nowYear = dayjs().year();

export const createTermSchema = z.object({
  year: z.number().min(1900).max(nowYear),
});

export type CreateTermInput = z.TypeOf<typeof createTermSchema>;

export const updateTermSchema = z.object({
  termId: z.string().cuid(),
  year: z.number().min(1900).max(nowYear),
});

export type updateTermInput = z.TypeOf<typeof updateTermSchema>;

export const getSingleTermSchema = z.object({
  termId: z.string().cuid(),
});

export const deleteTermSchema = z.object({
  termId: z.string().cuid(),
});
