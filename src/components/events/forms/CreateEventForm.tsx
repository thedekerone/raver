'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {  useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { api } from '~/utils/api'

export default function CreateEventForm({userId}:{userId:string}) {
    const createEvent = api.events.create.useMutation({
        onError: (error) => {
          console.log(error)
        },
        onMutate: (data) => {
          console.log(data)
        }
      })

    const formSchema = z.object({
      title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      }),
      description: z.string().min(2, {
        message: "Title must be at least 2 characters.",
      })
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: ""
        },
      })


      function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, description } = values
        console.log(values)
    
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
      <Button type="submit">Submit</Button>
    </form>
  </Form >
  )
}
