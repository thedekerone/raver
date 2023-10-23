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
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    onSaleDate: z.date().optional(),
});

export default function EventsForm() {
    const { toast } = useToast()
    const { uploadedFile, setUploadedFile, uploadFile } = useFileUpload();
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

        const {
            title,
            description,
            startDate,
            endDate,
            onSaleDate,
        } = values;

        await createEvent.mutateAsync({
            title,
            description,
            startDate,
            endDate,
            ...(onSaleDate ? { onSaleDate } : {}),
            bgImageUrl: uploadedFile?.name,
        });

        toast({
            variant: "success",
            title: "Event created successfully"
        })

        setLoading(false);
    }

    return (
        <div className="container rounded bg-white max-w-xl justify-center flex items-center shadow-md py-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="date" {...field} />
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
                    <div className="items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input
                            className="w-full flex"
                            onChange={onFileChange} id="picture" type="file" />
                    </div>

                    {/* TODO: FIGURE OUT THE TS FOR DATEPICKER LATER */}

                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="onSaleDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>Sales Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="w-full" type="submit">
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
        </div>

    );
}
