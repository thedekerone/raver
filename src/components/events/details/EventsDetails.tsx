import React from "react";
import { type TicketType, type Event } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Button } from "~/components/ui/button";

type Props = {
    eventItem: Event & { ticketTypes: TicketType[] };
};

export default function EventsDetails({
    eventItem: { title, description, ticketTypes, bgImageUrl },
}: Props) {
    return (
        <div>
            <div>
                {bgImageUrl && (
                    <AspectRatio ratio={4 / 1} className="bg-muted">
                        <Image fill objectPosition="top" src={bgImageUrl} alt="test" />
                    </AspectRatio>
                )}
            </div>
            <div className="container mt-5 grid grid-cols-3 gap-4">
                <div className="col-span-2 border-solid border-right-2 ">
                    <h1 className="text-6xl font-bold">{title}</h1>
                    <div className="mt-4">{description}</div>
                </div>

                <div className="mt-6">
                    {ticketTypes?.map((ticketType) => {
                        return (
                            <div key={ticketType.id} className="flex justify-between items-center">
                                <div className="text-md font-medium">{ticketType.name}</div>
                                <div>
                                    <span className="mr-4">{ticketType.price}.00$</span>

                                    <Button>Buy ticket</Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
