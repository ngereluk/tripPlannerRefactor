import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { MyGeoJson } from "../../../types";

const coordinateSchema = z.number().array();

export const getDrivingDirections = createTRPCRouter({
  getRouteData: publicProcedure
    .input(z.object({ coordinates: z.array(coordinateSchema).optional() }))
    .mutation(async ({ input }) => {
      const url =
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
      const ormResponse = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          coordinates: input.coordinates,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization:
            "5b3ce3597851110001cf62487304b26a75f24a8cb943fa137eb6a204",
        },
      });

      const geojsonObject = (await ormResponse.json()) as MyGeoJson;

      return {
        geojsonObject: geojsonObject,
      };
    }),
});
