import { api } from "~/server/utils/api";
import EventDisplayer from "~/components/EventDisplayer";
import { Navbar } from "~/components/layout/Navbar";

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
