import { useSession } from "next-auth/react";
import EventCard from "~/components/EventCard/EventCard";
import NavBar from "~/components/NavBar/NavBar";
import SearchBar from "~/components/SearchBar/SearchBar";
import { api } from "~/utils/api";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  const events = api.events.getAll.useQuery().data;

  return (
    <>
      <header className="from-skyblue via-mypurple to-mygreen relative mb-12 bg-gradient-to-r px-4 pb-12 pt-6 lg:h-[350px]">
        <NavBar />
        <SearchBar />
      </header>
      <main className="px-4 font-bold">
        <h2 className="mb-4">Most Popular Events</h2>
        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {events?.map((event) => {
            return (
              <EventCard
                key={event.id}
                title={event.title}
                imgSrc={event?.bgImage?.imagePath}
                date={
                  event.startDate && new Date(event.startDate).toDateString()
                }
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
