import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { signOut, signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {


    return (
        <div className="container mx-auto flex justify-between items-center p-4">
            <Link href={"/"}>
                <div className="flex items-center justify-between">
                    <Image width="50" height="50" src="/WhatsApp Image 2023-10-15 at 15.01.46.png" alt="logo" />{" "}
                </div>
            </Link>
            <NavigationMenu>
                <NavigationMenuList className="flex items-center">
                    <NavigationMenuItem>
                        <Link href="/admin/events/create" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                create event
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        {isLoggedIn ? (
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
