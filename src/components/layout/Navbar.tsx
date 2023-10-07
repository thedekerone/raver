import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { signOut, signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    const { data: session } = useSession()

    return (
        <div className="container mx-auto flex justify-between items-center p-4">
            <div className="flex items-center justify-between">
                <Image width="50" height="50" src="/document.svg" alt="logo" />{" "}
                <span className="font-bold">Raver</span>{" "}
            </div>
            <NavigationMenu>
                <NavigationMenuList className="flex items-center">
                    <NavigationMenuItem>
                        <Link href="/events/create" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                create event
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        {session ? (
                            <Button onClick={() => signOut()}>Sign Out</Button>
                        ) : (
                            <Button onClick={() => signIn()}>Sign In</Button>
                        )}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
