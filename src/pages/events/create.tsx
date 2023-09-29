import React from "react";
import { EventsForm } from "~/components/events/EventsForm/EventsForm";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

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

const CreateEventForm = () => {
  const { data: session } = useSession();

  if (typeof window === undefined) return null;

  return (
    <div className="w-full max-w-xs">
      <EventsForm organiserId={session?.user?.id ?? ""} />
    </div>
  );
};

export default CreateEventForm;
