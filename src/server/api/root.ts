import { createTRPCRouter } from "~/server/api/trpc";
import { getStaticRouteDataRouter } from "~/server/api/routers/getStaticRouteDataForMap";
import { openRouteService } from "~/server/api/routers/openRouteService";
import { getStaticMarkerInfo } from "~/server/api/routers/getStaticMarkerInfo";
import { getStaticMarkerName } from "~/server/api/routers/getStaticMarkerName";
import { getRouteDataForTrip } from "~/server/api/routers/getStaticRouteDataForTrip";
import { getTripForecast } from "~/server/api/routers/getTripForecast";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  getStaticRouteData: getStaticRouteDataRouter,
  openRouteService: openRouteService,
  getStaticMarkerInfo: getStaticMarkerInfo,
  getStaticMarkerName: getStaticMarkerName,
  getRouteDataForTrip: getRouteDataForTrip,
  getTripForecast: getTripForecast,
});

// export type definition of API
export type AppRouter = typeof appRouter;
