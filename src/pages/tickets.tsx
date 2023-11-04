import { api } from "~/server/utils/api";

export default function Tickets() {
    const { data: tickets } = api.tickets.list.useQuery();

    if (!tickets) return "loading";
    return (
        <div className="container">
            <ul>
                {tickets.map((ticket) => {
                    return (
                        <li
                            className="rounded px-4 py-6 shadow"
                            key={ticket.id}
                        >
                            <span className="font-bold">
                                {ticket.ticketType.name}
                            </span>{" "}
                            - <span>{ticket.event.title}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
