"use client";

import { ContainerClient } from "@azure/storage-blob";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ChangeEvent, ChangeEventHandler } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useFileUpload } from "~/hooks/useFileUpload";
import { api } from "~/server/utils/api";
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function CreateEventForm({ userId }: { userId: string }) {
  const createEvent = api.events.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onMutate: (data) => {
      console.log(data);
    },
  });
  const [imageUrl, uploadFile] = useFileUpload();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event?.target?.files?.[0]) {
      return;
    }

    await uploadFile(event.target.files[0]);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description } = values;

    createEvent.mutate({
      title,
      description,
      organiserId: userId,
      bgImageUrl: imageUrl

    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="descripcion" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input onChange={onFileChange} id="picture" type="file" />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
