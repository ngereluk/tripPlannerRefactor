// import { z } from "zod";

// import {
//   createTRPCRouter,
//   publicProcedure,
//   protectedProcedure,
// } from "~/server/api/trpc";

// export const exampleRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// export const getStaticRouteDataRouter = createTRPCRouter({
//   getData: publicProcedure.query(() => {

//     return {
//       StaticRouteData,
//     };
//   }),
// });

export const openRouteService = createTRPCRouter({
  getRouteData: publicProcedure
    .input(
      z.object({ coordinates: z.number().array(), authorization: z.string() })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.coordinates} and ${input.authorization}`,
      };
    }),
});
