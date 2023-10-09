import { api } from "~/server/utils/api";
import EventDisplayer from "~/components/EventDisplayer";
import { Navbar } from "~/components/layout/Navbar";
import { useSession } from "next-auth/react";
import { useToast } from "~/components/ui/use-toast";
import { type TicketType, type Event } from "@prisma/client";

export default function Home() {
  const { toast } = useToast()
  const { data: session } = useSession()
  const events = api.events.getAll.useQuery().data;
  const upcomingEvents = api.events.getUpcoming.useQuery().data
  const createTicket = api.tickets.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Successfully purchased ticket",
        variant: "success"
      })
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to buy ticket"
      })
    }
  })

  function buyTicket(event: Event & { ticketTypes: TicketType[] }) {
    console.log(event)
    if (!session?.user?.id || !event?.ticketTypes?.length) {
      return
    }
    createTicket.mutate({ userId: session.user.id, ticketTypeId: event.ticketTypes?.[0]?.id, eventId: event.id })
  }

  return (
    <>
      <Navbar />
      <h2>Upcoming Events</h2>
      {upcomingEvents && <EventDisplayer isLoggedIn={Boolean(session?.user.id)} buyTicket={buyTicket} events={upcomingEvents}></EventDisplayer>}

      <h2>All events</h2>
      {events && <EventDisplayer isLoggedIn={Boolean(session?.user.id)} events={events}></EventDisplayer>}
    </>
  );
}
