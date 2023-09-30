/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useRef } from "react";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import Router from "next/router";
import CreateEventForm from "~/components/events/forms/CreateEventForm";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const CreateEvent = () => {
  const { data: session } = useSession();

  if (typeof window === undefined) return null;

  return <div className="container">
    {session?.user.id && <CreateEventForm userId={session.user.id }></CreateEventForm>}

  </div>;
};

export default CreateEvent;
