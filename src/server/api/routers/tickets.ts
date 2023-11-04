import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const ticketsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ ticketTypeId: z.string(), eventId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.event.update({
                where: {
                    id: input.eventId,
                },
                data: {
                    attendees: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });

            return await ctx.db.ticket.create({
                data: {
                    ticketTypeId: input.ticketTypeId,
                    userId: ctx.session.user.id,
                    eventId: input.eventId,
                },
            });
        }),
    list: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.ticket.findMany({
            where: { userId: ctx.session.user.id },
            include: { ticketType: true, event: true },
        });
    }),
});
