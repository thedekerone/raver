import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { generateUpdateSasUrl } from "~/server/utils/storage";

export const imagesRouter = createTRPCRouter({


  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.image.create({
        data: {
          imagePath: input.name,
          userId: ctx.session.user.id
        },
      });
    }),
    generateSasUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return generateUpdateSasUrl(input.fileName);
    }),

});
