import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { eventsRouter } from "./routers/events";
import { imagesRouter } from "./routers/images";
import { ticketsRouter } from "./routers/tickets";
import { usersRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    example: exampleRouter,
    events: eventsRouter,
    images: imagesRouter,
    tickets: ticketsRouter,
    users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
