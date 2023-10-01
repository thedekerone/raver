'use client'

import { ContainerClient } from '@azure/storage-blob'
import { zodResolver } from '@hookform/resolvers/zod'
import path from 'path'
import React, { type ChangeEvent, ChangeEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { api } from '~/server/utils/api'

export default function CreateEventForm({ userId }: { userId: string }) {
  const createEvent = api.events.create.useMutation({
    onError: (error) => {
      console.log(error)
    },
    onMutate: (data) => {
      console.log(data)
    }
  })
  const sasUri= api.events.getSasUri.useQuery().data

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      
    },
  })

  async function uploadFile(event: ChangeEvent<HTMLInputElement>) {
    
    if(!event?.target?.files?.[0] || !sasUri){
      return
    }
    const file = event.target.files[0];
  
    const container = new ContainerClient(sasUri)
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    const blockBlobClient = container.getBlockBlobClient(`events_dsa${(new Date()).getTime()}.${path.extname(file.name)}`)

    try {
      
      const response = await blockBlobClient.uploadData(file, options)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, description } = values



    createEvent.mutate({
      title,
      description,
      organiserId: userId
    })
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
          <Input onChange={uploadFile} id="picture" type="file" />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form >
  )
}
