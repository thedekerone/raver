import React from "react";
import CreateEventForm from "~/components/events/forms/CreateEventForm";
import { withAuth } from "~/hoc/withAuth";

const CreateEvent = () => {

  return <div className="container">
    <CreateEventForm ></CreateEventForm>

  </div>;
};

export const getServerSideProps = withAuth()

export default CreateEvent;
