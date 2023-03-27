import { StaticRouteData } from "../../../utils/staticRouteData";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getStaticRouteDataRouter = createTRPCRouter({
  getData: publicProcedure.query(() => {
    return {
      StaticRouteData,
    };
  }),
});
