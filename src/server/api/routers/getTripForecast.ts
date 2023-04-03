import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Forecast } from "../../../types";

export const getTripForecast = createTRPCRouter({
  getData: publicProcedure
    .input(
      z.object({
        trailHeadLong: z.string().optional(),
        trailHeadLat: z.string().optional(),
        formattedStartDate: z.string(),
        formattedEndDate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      let url = "";
      let forecast;
      if (
        input.trailHeadLat !== undefined &&
        input.trailHeadLong !== undefined
      ) {
        url =
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
          `${input.trailHeadLat}` +
          "," +
          `${input.trailHeadLong}` +
          "/" +
          `${input.formattedStartDate}` +
          "/" +
          `${input.formattedEndDate}` +
          "?key=N47S4WN9992K6JJ5FH8R74D9N&unitGroup=metric";
        const apiResponse = await fetch(url, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        forecast = (await apiResponse.json()) as Forecast;
      }

      return {
        forecast: forecast,
      };
    }),
});
