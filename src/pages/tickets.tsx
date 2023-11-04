import { api } from "~/server/utils/api";

export default function Tickets() {
    const { data: tickets } = api.tickets.list.useQuery();
    console.log(tickets);
    if (!tickets) return "loading";
    return (
        <div className="container">
            <ul>
                {tickets.map((ticket) => {
                    return (
                        <li key={ticket.id}>
                            <span className="font-bold">
                                {ticket.ticketType.name}
                            </span>{" "}
                            - <span>{ticket.ticketType.event.title}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
