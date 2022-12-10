import { router } from "../trpc";
import { salaryInfoRouter } from "./salaryInfo";
import { termRouter } from "./term";

export const appRouter = router({
  salaryInfo: salaryInfoRouter,
  term: termRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
