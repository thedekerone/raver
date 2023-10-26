import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


export const usersRouter = createTRPCRouter({
  isOwner: protectedProcedure.input(z.string()).query(async ({ctx, input})=>{
    const results =  await ctx.db.user.findFirst({
        select:{
            id:true
        },
        where:{
            id: ctx.session.user.id,
            organisedEvents: {
               some:{
                id: input
               } 
            }
        }
    })

    return Boolean(results)
  })

});
