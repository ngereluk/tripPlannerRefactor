import { createTRPCRouter } from "~/server/api/trpc";
import { getStaticRouteDataRouter } from "~/server/api/routers/getStaticRouteData";
import { openRouteService } from "~/server/api/routers/openRouteService";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  getStaticRouteData: getStaticRouteDataRouter,
  openRouteService: openRouteService,
});

// export type definition of API
export type AppRouter = typeof appRouter;
