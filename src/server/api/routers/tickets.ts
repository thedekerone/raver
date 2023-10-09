import { getServerSession } from "next-auth";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const ticketsRouter = createTRPCRouter({
  create: protectedProcedure.input(z.object({ticketTypeId: z.string(), userId: z.string(), eventId:z.string()})).mutation(async ({ ctx, input }) => {
    await ctx.db.event.update({
        where:{
            id: input.eventId
        },
        data:{
            attendees:{
                connect:{
                    id:input.userId

                }
            }
        }
    })

    return await ctx.db.ticket.create({
        data:{
            ticketTypeId:input.ticketTypeId,
            userId:input.userId
        }
    });
  }),
});
