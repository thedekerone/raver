import { type GetStaticPaths, type GetStaticPropsContext, type InferGetStaticPropsType } from 'next'
import { createServerSideHelpers } from '@trpc/react-query/server';
import React from 'react'
import { appRouter } from '~/server/api/root';
import SuperJSON from 'superjson';
import { db } from '~/server/db';
import { api } from '~/server/utils/api';
import EventsDetails from '~/components/events/details/EventsDetails';
import { Navbar } from '~/components/layout/Navbar';

export async function getStaticProps(
    context: GetStaticPropsContext<{ id: string }>,
) {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {
            session: null,
            db
        },
        transformer: SuperJSON, // optional - adds superjson serialization
    });

    const id = context.params?.id!;
    await helpers.events.getByID.prefetch(id);
    return {
        props: {
            trpcState: helpers.dehydrate(),
            id,
        },
        revalidate: 1,
    };
}
export const getStaticPaths: GetStaticPaths = async () => {
    const events = await db.event.findMany({
        select: {
            id: true,
        },
    });
    return {
        paths: events.map((event) => ({
            params: {
                id: event.id,
            },
        })),
        fallback: 'blocking',
    };
};
export default function EventsDetailsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const { id } = props;
    const event = api.events.getByID.useQuery(id).data;

    if (!event) {
        return "loading..."
    }
    return (<>
        <Navbar />

        <EventsDetails eventItem={event}></EventsDetails>
    </>
    )
}


