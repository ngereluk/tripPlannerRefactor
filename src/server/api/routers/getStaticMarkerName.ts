import { MarkerNamesAndCoord } from "../../../utils/markerNamesAndCoord";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getStaticMarkerName = createTRPCRouter({
  getData: publicProcedure.mutation(() => {
    return {
      MarkerNamesAndCoord,
    };
  }),
});
