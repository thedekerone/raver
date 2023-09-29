import { type Event } from '@prisma/client'
import React from 'react'

export default function EventDisplayer({events}:{events: Event[]}) {
  return (
    <div className="container">
    {events.map(eventItem=><div key={eventItem.id} className="container-sm">
          {eventItem.title}
      </div>
    )}
    </div>
  )
}
