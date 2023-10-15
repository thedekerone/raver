import { type Event } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

type Props = { events: Event[] }

export default function EventDisplayer({ events }: Props) {


  return (
    <div className="container grid grid-cols-4 gap-4	">
      {events.map((eventItem) => (
        <Card key={eventItem.id} className="container-sm overflow-hidden">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              fill
              objectFit="contain"
              src={
                eventItem?.bgImageUrl ||
                "https://media.traveler.es/photos/63aa3a712424e02f98a62399/16:9/w_2560%2Cc_limit/iStock-518820132.jpg"
              }
              alt="test"
            />
          </AspectRatio>
          <CardHeader>
            <CardTitle>
              <Link href={`events/${eventItem.id}`}>
                {eventItem.title}
              </Link>
            </CardTitle>
            <CardDescription>{eventItem.description}</CardDescription>
          </CardHeader>

        </Card>
      ))}
    </div>
  );
}
