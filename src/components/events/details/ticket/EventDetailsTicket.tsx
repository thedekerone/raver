import { type TicketType } from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "~/components/ui/button";

interface Props {
    ticketType: TicketType;
    buyTicket: (ticketTypeId: string) => Promise<void>;
}

export default function EventDetailsTickets({ ticketType, buyTicket }: Props) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await buyTicket(ticketType.id);
        setLoading(false);
    };

    return (
        <div
            key={ticketType.id}
            className="flex items-center justify-between rounded border p-3"
        >
            <span>{ticketType.name}</span>
            <Button onClick={handleClick} className="h-8 text-xs">
                {loading ? (
                    <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Loading
                    </>
                ) : (
                    "Buy"
                )}
            </Button>
        </div>
    );
}
