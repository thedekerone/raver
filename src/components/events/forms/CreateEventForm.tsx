"use client";

import {
  BlockBlobClient,
} from "@azure/storage-blob";
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
import { ReloadIcon } from "@radix-ui/react-icons"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function CreateEventForm({ userId }: { userId: string }) {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const createEvent = api.events.create.useMutation({
    onError: (error) => {
      console.log(error);
    },
    onMutate: (data) => {
      console.log(data);
    },
  });

  const sasUri = api.events.generateSasUrl.useQuery(
    { fileName: uploadedFile?.name ?? "" },
    { enabled: !!uploadedFile?.name },
  ).data;
  const uploadImage = api.images.create.useMutation({
    onMutate: (data) => {
      console.log(data);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event?.target?.files?.[0]) {
      return;
    }

    setUploadedFile(event.target.files[0]);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!sasUri || !uploadedFile) return;

    setLoading(true)

    const { title, description } = values;

    await uploadFileFromBlob(sasUri, uploadedFile)

    await createEvent.mutateAsync({ title, description, bgImageUrl: uploadedFile.name, organiserId: userId })

    setLoading(false)

  }

  async function uploadFileFromBlob(sasUri: string, file: File) {

    const blobService = new BlockBlobClient(sasUri);
    const fileBuffer = await file.arrayBuffer();
    await blobService.uploadData(fileBuffer);

    uploadImage.mutate({ name: file.name, userId: userId });
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
        <Button disabled={loading} type="submit">
          {loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Creating</>
            : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
