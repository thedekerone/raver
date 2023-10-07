import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import CreateEventForm from "~/components/events/forms/CreateEventForm";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const CreateEvent = () => {
  const { data: session } = useSession();

  if (typeof window === undefined) return null;

  return <div className="container">
    {session?.user.id && <CreateEventForm userId={session.user.id}></CreateEventForm>}

  </div>;
};

export default CreateEvent;
