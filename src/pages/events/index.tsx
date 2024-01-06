import EventDisplayer from "~/components/EventDisplayer";
import { api } from "~/server/utils/api";

export default function EventsPage() {
    const events = api.events.getAll.useQuery().data;
    if (!events) return "loading";
    return (
        <div className="container">
            <EventDisplayer events={events} />;
        </div>
    );
}
