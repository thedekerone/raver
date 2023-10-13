import React from "react";
import EventsForm from "~/components/events/form/EventsForm";
import { withAuth } from "~/hoc/withAuth";

const CreateEvent = () => {

  return <div className="container">
    <EventsForm ></EventsForm>

  </div>;
};

export const getServerSideProps = withAuth()

export default CreateEvent;
