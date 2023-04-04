import { StaticRouteLengths } from "../../../utils/staticRouteLengths";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getStaticRouteDataRouter = createTRPCRouter({
  getData: publicProcedure.query(() => {
    return {
      StaticRouteLengths,
    };
  }),
});
