import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { StaticRouteData } from "../../../utils/staticRouteData";

const coordinatesSchema = z.number().array();

export const getRouteDataForTrip = createTRPCRouter({
  getData: publicProcedure
    .input(z.object({ segmentCoordinates: z.array(coordinatesSchema) }))
    .mutation(({ input }) => {
      let segmentLength = 0;
      let segmentGrossElevation = 0;
      for (const staticRoute of StaticRouteData) {
        if (
          //@ts-ignore
          staticRoute.geoJson.metadata.query.coordinates[0][0] ===
            //@ts-ignore
            input.segmentCoordinates[0][0] &&
          //@ts-ignore
          staticRoute.geoJson.metadata.query.coordinates[0][1] ===
            //@ts-ignore
            input.segmentCoordinates[0][1] &&
          //@ts-ignore
          staticRoute.geoJson.metadata.query.coordinates[1][0] ===
            //@ts-ignore
            input.segmentCoordinates[1][0] &&
          //@ts-ignore
          staticRoute.geoJson.metadata.query.coordinates[1][1] ===
            //@ts-ignore
            input.segmentCoordinates[1][1]
        ) {
          if (
            staticRoute.geoJson.features[0] !== undefined &&
            staticRoute.geoJson.features[0].properties.segments[0] !== undefined
          ) {
            segmentLength =
              staticRoute.geoJson.features[0].properties.segments[0].distance;
            segmentGrossElevation =
              staticRoute.geoJson.features[0].properties.ascent;
          }
        }
      }
      return {
        segmentLength: segmentLength,
        segmentGrossElevation: segmentGrossElevation,
      };
    }),
});
