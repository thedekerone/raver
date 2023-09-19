import { Button } from "@material-tailwind/react";
import { useSession, signIn, signOut } from "next-auth/react";

export function LoginBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button className="" onClick={() => void signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button className="" onClick={() => void signIn()}>
        Sign in
      </Button>
    </>
  );
}
