// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { z } from "zod";
// import { GeoJSONProps } from "react-leaflet";

// const coordinateSchema = z.number().array();

// export const openRouteService = createTRPCRouter({
//   getRouteData: publicProcedure
//     .input(z.object({ coordinates: z.array(coordinateSchema).optional() }))
//     .mutation(async ({ input }) => {
//       const url =
//         "https://api.openrouteservice.org/v2/directions/foot-hiking/geojson";
//       const ormResponse = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify({
//           coordinates: input.coordinates,
//           elevation: "true",
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//           authorization:
//             "5b3ce3597851110001cf62487304b26a75f24a8cb943fa137eb6a204",
//         },
//       });

//       const geojsonObject = await ormResponse.json();
//       return {
//         geojsonObject: geojsonObject as GeoJSONProps["data"],
//       };
//     }),
// });

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { GeoJSONProps } from "react-leaflet";
import { Forecast } from "../../../types";

export const getTripForecast = createTRPCRouter({
  getData: publicProcedure
    .input(
      z.object({
        trailHeadLong: z.string(),
        trailHeadLat: z.string(),
        formattedStartDate: z.string(),
        formattedEndDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const url =
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        input.trailHeadLat +
        "," +
        input.trailHeadLong +
        "/" +
        input.formattedStartDate +
        "/" +
        input.formattedEndDate +
        "?key=N47S4WN9992K6JJ5FH8R74D9N&unitGroup=metric";

      const apiResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const forecast = await apiResponse.json();
      return {
        forecast: forecast as Forecast,
      };
    }),
});
