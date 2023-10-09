import { z } from "zod";
import { getPublicImageUrl } from "~/server/utils/storage";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const eventsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.event.findMany({include: {
      ticketTypes: true
    }});
  }),


  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        bgImageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.event.create({
        data: { ...input, organiserId: ctx.session.user.id, bgImageUrl: input.bgImageUrl && getPublicImageUrl(input.bgImageUrl) },
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
        },
        include:{
          ticketTypes:true
        }
      })
    }),

  getByID: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.event.findFirst({ where: { id: input } });
  }),

  getTicketTypesByEventId: publicProcedure.input(z.string()).query(async ({ctx, input})=>{
    return await ctx.db.ticketType.findMany({
      where: {
        eventId: input
      }
    })
  })
});
