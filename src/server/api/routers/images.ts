import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({include:{organiser:true}});
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        organiserId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.event.create({
        data: input,
      });
    }),

  getByID: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.event.findFirst({ where: { id: input } });
  }),
});
