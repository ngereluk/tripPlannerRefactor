import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { AddressObj, MyGeoJson } from "../../../types";

export const getAddressCoordinates = createTRPCRouter({
  getData: publicProcedure
    .input(z.object({ address: z.string() }))
    .mutation(async ({ input }) => {
      const url =
        "https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf62487304b26a75f24a8cb943fa137eb6a204&text=" +
        input.address +
        " alberta canada";
      const ormResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const res = (await ormResponse.json()) as MyGeoJson;
      const addressObj = res.features as unknown as AddressObj[];
      //@ts-ignore
      if (addressObj.length === 1) {
        return {
          addressObj: addressObj,
        };
      }
      //else, return address and coord to front
      else {
        return {
          addressObj: addressObj,
        };
      }
    }),
});
