import { router } from "../trpc";
import { salaryInfoRouter } from "./salaryInfo";

export const appRouter = router({ salaryInfo: salaryInfoRouter });

// export type definition of API
export type AppRouter = typeof appRouter;
