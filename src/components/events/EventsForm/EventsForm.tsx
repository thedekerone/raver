import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";

type FormValues = {
  title: string;
  description: string;
  image: File[];
  startDate: Date;
  endDate: Date;
};

export function EventsForm() {
  const createEvent = api.events.create.useMutation({
    onMutate(variables) {
      console.log(variables);
    },
  });

  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    createEvent.mutate({
      title: data.title,
      description: data.description,
    });
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Create event
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter event details.
      </Typography>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            crossOrigin="*"
            label="Title"
            {...register("title", { required: true })}
          />

          <Input
            crossOrigin="*"
            label="Description"
            {...register("description", { required: true })}
          />
          <Input
            type="file"
            crossOrigin="*"
            label="Image"
            {...register("image", { required: true })}
          />
          <Input
            type="date"
            crossOrigin="*"
            label="Start Date"
            {...register("startDate", { required: true })}
          />
          <Input
            type="date"
            crossOrigin="*"
            label="End Date"
            {...register("endDate", { required: true })}
          />
        </div>

        <Button type="submit" className="mt-6" fullWidth>
          Create Event
        </Button>
      </form>
    </Card>
  );
}
