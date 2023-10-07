import React from "react";
import { useSession } from "next-auth/react";
import CreateEventForm from "~/components/events/forms/CreateEventForm";
import { withAuth } from "~/hoc/withAuth";

const CreateEvent = () => {
  const { data: session } = useSession();


  return <div className="container">
    {session?.user.id && <CreateEventForm userId={session.user.id}></CreateEventForm>}

  </div>;
};

export const getServerSideProps = withAuth()

export default CreateEvent;
