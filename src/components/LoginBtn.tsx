"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "./UI/Button/Button";

export function LoginBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Button
          className="bg-myblack text-white"
          onClick={() => void signOut()}
        >
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      <Button className="bg-myblack text-white" onClick={() => void signIn()}>
        Sign in
      </Button>
    </>
  );
}
