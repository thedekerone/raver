import React from "react";
import EventsForm from "~/components/events/form/EventsForm";
import { withAuth } from "~/hoc/withAuth";

const CreateEvent = () => {
    return (
        <div className="pb-16 pt-8">
            <EventsForm />
        </div>
    );
};

export const getServerSideProps = withAuth();

export default CreateEvent;
