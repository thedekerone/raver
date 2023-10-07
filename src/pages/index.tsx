import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/server/utils/api";
import Link from "next/link";
import EventDisplayer from "~/components/EventDisplayer";
import Image from "next/image";
import { Navbar } from "~/components/layout/Navbar";

export default function Home() {
  const events = api.events.getAll.useQuery().data;

  return (
    <>
      <Navbar />
      {events && <EventDisplayer events={events}></EventDisplayer>}
    </>
  );
}
