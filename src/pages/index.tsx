import { api } from "~/server/utils/api";
import { Navbar } from "~/components/layout/Navbar";
import EventDisplayer from "~/components/EventDisplayer";
import { Button } from "~/components/ui/button";
import Carousel from "~/components/layout/Carousel";

export default function Home() {
  const events = api.events.getAll.useQuery().data;
  const upcomingEvents = api.events.getUpcoming.useQuery().data


  return (
    <>
      <Navbar />

      <div className="container flex-col flex items-center justify-center my-16">
        <h2 className="text-3xl font-bold max-w-sm text-center mb-4">
          Discover Exciting Events Near You
        </h2>
        <span className="mb-9 text-sm">Find the best upcoming events in your area and secure your tickets today.</span>

        <div className="">
          <Button>Explore</Button>
          <Button className="ml-4 " variant={"secondary"}>Buy</Button>
        </div>
      </div>

      {events && events?.length > 4 && <>

        <Carousel images={events.map(el => ({ src: el.bgImageUrl || "", alt: el.title })).slice(1, 7)}></Carousel>
        <div className="my-2"></div>
        <Carousel reverse={true} images={events.map(el => ({ src: el.bgImageUrl || "", alt: el.title })).slice(1, 7)}></Carousel>
      </>}



      <div className="container mb-7">
        <h2 className="mb-3 font-semibold">Upcoming Events</h2>
        {upcomingEvents && <EventDisplayer events={upcomingEvents}></EventDisplayer>}
      </div>

      <div className="container">
        <h2 className="mb-3 font-semibold">All events</h2>
        {events && <EventDisplayer events={events}></EventDisplayer>}
      </div>
    </>
  );
}
