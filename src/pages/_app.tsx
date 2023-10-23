import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/server/utils/api";

import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster"
import { Navbar } from "~/components/layout/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Navbar isLoggedIn={Boolean(session?.user.id)} />
      <Component {...pageProps} />
      <div id="modals" />
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
