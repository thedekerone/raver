import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Link from "next/link";
import EventDisplayer from "~/components/EventDisplayer";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  const events = api.events.getAll.useQuery().data;
  console.log(events)
  return (
    <>
      <div className="container flex justify-between mx-auto p-4">
        <h1>Raver</h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href='/events/create' legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  create event

                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {session? <Button onClick={()=>signOut()}>Sign Out</Button>:  <Button onClick={()=>signIn()}>Sign In</Button>}
             
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </div>
      {events && <EventDisplayer events={events}></EventDisplayer>}
    </>
  );
}
