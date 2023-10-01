import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({


  create: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        userId: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.image.create({
        data: {
          imagePath: input.url,
          userId: input.userId
        },
      });
    }),


});
