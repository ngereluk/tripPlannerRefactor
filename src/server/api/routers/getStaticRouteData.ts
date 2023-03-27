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

import { StaticRouteData } from "../../../utils/staticRouteData";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getStaticRouteDataRouter = createTRPCRouter({
  getData: publicProcedure.query(() => {
    return {
      StaticRouteData,
    };
  }),
});
