import { StaticSiteInfo } from "../../../utils/staticSiteInfo";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { SiteInfoPanelData } from "../../../types";

const amenitiesSchema = z.number().array();

const siteInfoPanelDataSchema = z.object({
  name: z.string(),
  noSites: z.number(),
  coordinates: z.string(),
  park: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  waterSource: z.string(),
  amenities: z.array(amenitiesSchema),
  isCampsite: z.boolean(),
  linkToGovtSite: z.string(),
});

//z.array(siteInfoPanelDataSchema).optional(

export const getStaticMarkerInfo = createTRPCRouter({
  getMarkerData: publicProcedure
    .input(z.object({ selectedMarker: z.string() }))
    .mutation(async ({ input }) => {
      const markerData = StaticSiteInfo.filter(
        (
          //@ts-ignore
          markerInfo
        ) => markerInfo.name === input.selectedMarker
      );
      console.log("markerData ", markerData);
      return {
        markerData: markerData[0] as SiteInfoPanelData, //markerData,
      };
    }),
});
