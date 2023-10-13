import React from 'react'
import { type Event } from "@prisma/client";

type Props = {
    event: Event
}

export default function EventsDetails({ event: { title, description } }: Props) {
    return (<>
        <div>{title}</div>
        <div>{description}</div>
    </>
    )
}
