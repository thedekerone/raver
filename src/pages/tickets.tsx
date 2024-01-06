import Image from "next/image";
import TicketDetailsModal from "~/components/tickets/TicketDetailsModal";
import { api } from "~/server/utils/api";

export default function Tickets() {
    const { data: tickets } = api.tickets.list.useQuery();

    if (!tickets) return "loading";
    console.log(tickets[0]?.event.startDate);
    return (
        <>
            <div className="container mt-8">
                <ul className="grid gap-6">
                    {tickets.map((ticket) => {
                        return (
                            <li
                                className="flex items-center justify-between rounded px-8 py-6 shadow shadow-gray-300"
                                key={ticket.id}
                            >
                                <div className="flex items-center gap-6">
                                    <Image
                                        width="150"
                                        className="rounded"
                                        height="150"
                                        src={ticket.event?.bgImageUrl || ""}
                                        alt="event image"
                                    />
                                    <div>
                                        <span className="font-bold">
                                            {ticket.ticketType.name}
                                        </span>{" "}
                                        - <span>{ticket.event.title}</span>
                                        <div>
                                            {ticket.event.startDate?.toUTCString() ||
                                                ""}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <TicketDetailsModal />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
