import { api } from "~/server/utils/api";
import EventDisplayer from "~/components/EventDisplayer";
import { Button } from "~/components/ui/button";
import Carousel from "~/components/layout/Carousel";

export default function Home() {
    const events = api.events.getAll.useQuery().data;
    const upcomingEvents = api.events.getUpcoming.useQuery().data;

    return (
        <>
            <div className="container my-16 flex flex-col items-center justify-center">
                <h2 className="mb-4 max-w-sm text-center text-3xl font-bold">
                    Discover Exciting Events Near You
                </h2>
                <span className="mb-9 text-sm">
                    Find the best upcoming events in your area and secure your
                    tickets today.
                </span>

                <div>
                    <Button>Explore</Button>
                    <Button className="ml-4 " variant={"secondary"}>
                        Buy
                    </Button>
                </div>
            </div>

            {events && events?.length > 4 && (
                <>
                    <Carousel
                        images={events
                            .map((el) => ({
                                src: el.bgImageUrl || "",
                                alt: el.title,
                            }))
                            .slice(1, 7)}
                    />
                    <div className="my-2" />
                    <Carousel
                        reverse={true}
                        images={events
                            .map((el) => ({
                                src: el.bgImageUrl || "",
                                alt: el.title,
                            }))
                            .slice(1, 7)}
                    />
                </>
            )}

            <div className="container my-7">
                <h2 className="mb-3 font-semibold">Upcoming Events</h2>
                {upcomingEvents && <EventDisplayer events={upcomingEvents} />}
            </div>

            <div className="container">
                <h2 className="mb-3 font-semibold">All events</h2>
                {events && <EventDisplayer events={events} />}
            </div>
        </>
    );
}
