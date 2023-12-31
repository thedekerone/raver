import { type EventCategory, type Event } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";

type Props = { events: (Event & { categories: EventCategory[] })[] };

export default function EventDisplayer({ events }: Props) {
    return (
        <div className="grid grid-cols-4 gap-7">
            {events.map((eventItem) => (
                <Card
                    key={eventItem.id}
                    className="container-sm cursor-pointer overflow-hidden transition duration-300 ease-out  hover:drop-shadow-lg"
                >
                    <AspectRatio ratio={2 / 1} className="bg-muted">
                        <Image
                            fill
                            objectFit="cover"
                            src={
                                eventItem?.bgImageUrl ||
                                "https://media.traveler.es/photos/63aa3a712424e02f98a62399/16:9/w_2560%2Cc_limit/iStock-518820132.jpg"
                            }
                            alt="test"
                        />
                    </AspectRatio>

                    <CardHeader className="px-3 py-3">
                        <CardTitle className="text-lg">
                            <Link href={`events/${eventItem.id}`}>
                                {eventItem.title}
                            </Link>
                        </CardTitle>
                        <CardDescription>
                            {eventItem?.categories?.map((category) => (
                                <div key={category.id}>
                                    <Badge>{category.name}</Badge>
                                </div>
                            ))}
                            {eventItem.description}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
