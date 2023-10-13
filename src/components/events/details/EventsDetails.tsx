import React from 'react'
import { type TicketType, type Event } from "@prisma/client";

type Props = {
    event: Event & { ticketTypes: TicketType[] }
}

export default function EventsDetails({ event: { title, description, ticketTypes } }: Props) {
    return (<>
        <div>{title}</div>
        <div>{description}</div>
        {ticketTypes?.map(ticketType => {
            return <div key={ticketType.id}>
                {ticketType.name}
                {ticketType.price}
                {ticketType.description}
            </div>
        })}
    </>
    )
}
