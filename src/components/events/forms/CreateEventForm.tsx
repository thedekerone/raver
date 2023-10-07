"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { type ChangeEvent, useState } from "react";
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
import { api } from "~/server/utils/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFileUpload } from "../hooks/fileUpload";
import { useToast } from "~/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function CreateEventForm({ userId }: { userId: string }) {
  const { toast } = useToast()
  const { uploadedFile, setUploadedFile, uploadFile } = useFileUpload(userId);
  const [loading, setLoading] = useState(false);

  const createEvent = api.events.create.useMutation({
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error: Couldn't create event",
        description: error.message,
      })
    },
    onMutate: () => {
      toast({
        description: "Event created successfully",
      })
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event?.target?.files?.[0]) {
      return
    }

    setUploadedFile(event.target.files[0]);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (uploadedFile) {
      await uploadFile(uploadedFile);
    }


    const { title, description } = values;


    await createEvent.mutateAsync({
      title,
      description,
      bgImageUrl: uploadedFile?.name,
      organiserId: userId,
    });

    toast({
      variant: "success",
      title: "Event created successfully"
    })

    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn" {...field} />
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
            <Input

              onChange={onFileChange} id="picture" type="file" />
          </div>
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Creating
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
