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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import LoginModal from "../LoginModal";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto flex items-center justify-between p-4">
      <Link href={"/"}>
        <div className="flex items-center justify-between">
          <Image
            width="50"
            height="50"
            src="/WhatsApp Image 2023-10-15 at 15.01.46.png"
            alt="logo"
          />{" "}
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
            {session ? (
              <Button onClick={() => signOut()}>Sign Out</Button>
            ) : (
              <LoginModal />
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
