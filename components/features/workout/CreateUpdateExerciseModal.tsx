import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, useForm } from "react-hook-form";

//zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUpdateExerciseFormSchema } from "@/lib/validations/createUpdateExerciseForm/createUpdateExerciseFormValidator";
import {
  createExercise,
  deleteSingleExercise,
} from "@/lib/actions/exercise.actions";
import { DialogClose } from "@radix-ui/react-dialog";

type CreateUpdateExerciseModalProps = {
  userId: string;
  dayId: string;
  name?: string;
  sets?: number;
  reps?: number;
  url?: string;
  exerciseId?: string;
  variant: "create" | "update";
};

const CreateUpdateExerciseModal = ({
  userId,
  dayId,
  name,
  sets,
  reps,
  url,
  exerciseId,
  variant,
}: CreateUpdateExerciseModalProps) => {
  const form = useForm<z.infer<typeof createUpdateExerciseFormSchema>>({
    resolver: zodResolver(createUpdateExerciseFormSchema),
  });

  const onSubmit = async (
    values: z.infer<typeof createUpdateExerciseFormSchema>
  ) => {
    if (variant === "create") {
      await createExercise({
        exercise: {
          name: values.exerciseName,
          url: values.exerciseUrl,
          reps: Number(values.exerciseReps),
          sets: Number(values.exerciseSets),
        },
        userId,
        dayId,
      });
    }

    if (variant === "update") {
      await deleteSingleExercise(exerciseId);
      await createExercise({
        exercise: {
          name: values.exerciseName,
          url: values.exerciseUrl,
          reps: Number(values.exerciseReps),
          sets: Number(values.exerciseSets),
        },
        userId,
        dayId,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-sm border p-2">
          {variant === "create" ? "Kreiraj novu vežbu" : "izmeni"}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "create" ? "Kreiraj novu vežbu" : "Izmeni vežbu "}
          </DialogTitle>
        </DialogHeader>
        <Form
          onSubmit={() => {
            form.handleSubmit(onSubmit)();
          }}
          {...form}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="exerciseName" className="text-left">
                Naziv Vezbe
              </Label>
              <Input
                {...form.register("exerciseName")}
                id="exerciseName"
                defaultValue={variant === "update" ? name : ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="exerciseUrl" className="text-left">
                Video url
              </Label>
              <Input
                {...form.register("exerciseUrl")}
                id="exerciseUrl"
                defaultValue={variant === "update" ? url : ""}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="exerciseReps" className="text-right">
                Ponavljanja
              </Label>
              <Input
                {...form.register("exerciseReps")}
                id="exerciseReps"
                type="number"
                className="col-span-3"
                defaultValue={variant === "update" ? reps : ""}
              />

              <Label htmlFor="exerciseSets" className="text-right">
                Serija
              </Label>
              <Input
                {...form.register("exerciseSets")}
                id="exerciseSets"
                type="number"
                className="col-span-3"
                defaultValue={variant === "update" ? sets : ""}
              />
            </div>
          </div>
          <DialogClose>
            <Button
              variant="gold"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {variant === "create" ? "Kreiraj" : "Izmeni"}
            </Button>
          </DialogClose>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateExerciseModal;
