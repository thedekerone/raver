import { type User, type Event } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export default function EventDisplayer({events}:{events: (Event & {organiser: User})[]}) {
  return (
    <div className="container grid grid-cols-4 gap-4	">
    {events.map(eventItem=><div key={eventItem.id} className="container-sm">
      <div>
        <img  src={eventItem?.bgImageUrl || "https://media.traveler.es/photos/63aa3a712424e02f98a62399/16:9/w_2560%2Cc_limit/iStock-518820132.jpg"} alt="test" />
      </div>
         <div>
         {eventItem.title}
         </div>
    
          
      </div>
    )}
    </div>
  )
}
