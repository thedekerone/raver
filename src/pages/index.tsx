import { api } from "~/server/utils/api";
import { Navbar } from "~/components/layout/Navbar";
import EventDisplayer from "~/components/EventDisplayer";

export default function Home() {
  const events = api.events.getAll.useQuery().data;
  const upcomingEvents = api.events.getUpcoming.useQuery().data


  return (
    <>
      <Navbar />
      <h2>Upcoming Events</h2>
      {upcomingEvents && <EventDisplayer events={upcomingEvents}></EventDisplayer>}

      <h2>All events</h2>
      {events && <EventDisplayer events={events}></EventDisplayer>}
    </>
  );
}
