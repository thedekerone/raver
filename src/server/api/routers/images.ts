import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({


  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.image.create({
        data: {
          imagePath: input.name,
          userId: input.userId
        },
      });
    }),

});
