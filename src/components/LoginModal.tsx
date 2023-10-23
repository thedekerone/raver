import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { BsDiscord, BsFacebook, BsGoogle } from "react-icons/bs";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { signIn } from "next-auth/react";

function LoginModal() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const sendEmail = () => {
    try {
      if (!email) return;
      toast({
        description: "Email sent succesfully.",
      });
      setEmail("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Image
            src="/WhatsApp Image 2023-10-15 at 15.01.46.png"
            width={50}
            height={50}
            alt="logo"
          />
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>To continue to Mista</DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => signIn("google")}
          >
            <BsGoogle className="mr-2" />
            Google
          </Button>
          <Button className="w-full" variant={"outline"} disabled>
            <BsFacebook className="mr-2" />
            Facebook
          </Button>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => signIn("discord")}
          >
            <BsDiscord className="mr-2" />
            Discord
          </Button>
        </div>
        <div className="relative flex h-8 w-full items-center justify-center">
          <Separator />
          <p className="absolute bg-white px-4 text-gray-400">
            Or continue with
          </p>
        </div>
        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="email" className="text-left">
            Email
          </Label>
          <Input
            id="email"
            placeholder="email@gmail.com"
            value={email}
            type="email"
            onChange={handleInputChange}
          />
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="w-full uppercase"
            onClick={sendEmail}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
