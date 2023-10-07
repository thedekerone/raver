// hoc/withAuth.ts
import {
    type GetServerSidePropsContext,
    type GetServerSidePropsResult,
} from "next";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";

type GetServerSidePropsWithSession = (
    context: GetServerSidePropsContext,
    session: Session,
) => Promise<GetServerSidePropsResult<unknown>>;

export const withAuth = (
    getServerSidePropsFunc?: GetServerSidePropsWithSession,
) => {
    return async (
        context: GetServerSidePropsContext,
    ): Promise<GetServerSidePropsResult<unknown>> => {
        const session = await getSession(context);
        if (!session) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        if (getServerSidePropsFunc) {
            return await getServerSidePropsFunc(context, session);
        }

        return { props: { session } };
    };
};
