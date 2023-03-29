import { StaticSiteInfo } from "../../../utils/staticSiteInfo";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { SiteInfoPanelData } from "../../../types";

const amenitiesSchema = z.number().array();

export const getStaticMarkerInfo = createTRPCRouter({
  getMarkerData: publicProcedure
    .input(z.object({ selectedMarker: z.string() }))
    .mutation(async ({ input }) => {
      const markerData = StaticSiteInfo.filter(
        (markerInfo) => markerInfo.name === input.selectedMarker
      );
      return {
        markerData: markerData[0] as SiteInfoPanelData,
      };
    }),
});
