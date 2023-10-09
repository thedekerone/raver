import { z } from "zod";
import { getPublicImageUrl } from "~/server/utils/storage";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany();
  }),


  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        organiserId: z.string(),
        bgImageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.event.create({
        data: { ...input, bgImageUrl: input.bgImageUrl && getPublicImageUrl(input.bgImageUrl) },
      });
    }),

    getUpcoming: publicProcedure.query(async ({ctx})=>{
      return await ctx.db.event.findMany({
        where: {
          startDate:{
            gte: new Date(),
          },
        },
        orderBy: {
          startDate: "asc"
        }
      })
    }),

  getByID: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.event.findFirst({ where: { id: input } });
  }),
});
