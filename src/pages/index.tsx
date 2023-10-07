import { api } from "~/server/utils/api";
import EventDisplayer from "~/components/EventDisplayer";
import { Navbar } from "~/components/layout/Navbar";

export default function Home() {
  const events = api.events.getAll.useQuery().data;

  return (
    <>
      <Navbar />
      {events && <EventDisplayer events={events}></EventDisplayer>}
    </>
  );
}
