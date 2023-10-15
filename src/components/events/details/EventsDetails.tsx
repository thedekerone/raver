import React from "react";
import { type TicketType, type Event } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { BsFacebook, BsTwitter, BsTwitch } from "react-icons/bs";

type Props = {
    eventItem: Event & { ticketTypes: TicketType[] };
};

export default function EventsDetails({
    eventItem: { title, description, ticketTypes, bgImageUrl },
}: Props) {
    return (
        <div className="container ">
            <div className="container max-w-2xl">
                <div className="text-sm">
                    <span>Events</span>
                    <span className="mx-2">{">"}</span>
                    <span>Category</span>
                </div>
                <div className="mb-8 mt-2">
                    <h1 className="mb-2 text-5xl font-bold">{title}</h1>

                    <span>{description}</span>

                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                        <div className="flex w-11 items-center overflow-hidden rounded-full">
                            <AspectRatio ratio={1 / 1} className="bg-muted">
                                <Image
                                    fill
                                    src={
                                        bgImageUrl ||
                                        "https://media.traveler.es/photos/63aa3a712424e02f98a62399/16:9/w_2560%2Cc_limit/iStock-518820132.jpg"
                                    }
                                    alt="test"
                                />
                            </AspectRatio>
                        </div>
                        <div>
                            <h2 className="text-space-1 mb-0 text-sm font-medium">
                                John Doe
                            </h2>
                            <span className="text-xs">13 Feb 2022</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span>
                            <BsFacebook />{" "}
                        </span>
                        <span>
                            <BsTwitter />
                        </span>
                        <span>
                            <BsTwitch />
                        </span>
                    </div>
                </div>
            </div>

            <div className="container max-w-lg mt-7 ">
                {ticketTypes.map(ticket => {
                    return <div key={ticket.id} className="flex justify-between border rounded items-center p-3">
                        <span>
                            {ticket.name}
                        </span>
                        <Button className="text-xs h-8">
                            Buy
                        </Button>

                    </div>
                })}
            </div>

            <div className="container mt-10">
                <AspectRatio ratio={5 / 2} className="w-full">
                    <Image objectPosition="top" objectFit="cover" fill src={bgImageUrl || ""} alt={title}></Image>

                </AspectRatio>
            </div>
        </div>
    );
}
