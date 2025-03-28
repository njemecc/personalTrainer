"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUpdateExerciseFormSchema } from "@/lib/validations/createUpdateExerciseForm/createUpdateExerciseFormValidator";
import {
  createExercise,
  deleteSingleExercise,
} from "@/lib/actions/exercise.actions";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Dropdown from "@/components/ui/Dropdown";
import { toast } from "@/components/ui/use-toast";

type CreateUpdateExerciseModalProps = {
  userId: string;
  dayId: string;
  name?: string;
  sets?: number;
  reps?: number;
  url?: string;
  exerciseId?: string;
  variant: "create" | "update";
  description?: string;
};

const CreateUpdateExerciseModal = ({
  userId,
  dayId,
  sets,
  reps,
  exerciseId,
  variant,
  description,
}: CreateUpdateExerciseModalProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<z.infer<typeof createUpdateExerciseFormSchema>>({
    resolver: zodResolver(createUpdateExerciseFormSchema),
    defaultValues: {
      exercise: {},
      exerciseReps: reps?.toString() || "",
      exerciseSets: sets?.toString() || "",
      exerciseDescription: variant === "update" ? description : "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createUpdateExerciseFormSchema>
  ) => {
    try {
      if (variant === "create") {
        await createExercise({
          exercise: {
            name: values.exercise.name,
            url: values.exercise.azureName,
            reps: Number(values.exerciseReps),
            sets: Number(values.exerciseSets),
            description: values.exerciseDescription,
          },
          userId,
          dayId,
        });

        toast({
          variant: "default",
          title: "Uspešno dodata vežba!",
        });
      } else if (variant === "update" && exerciseId) {
        await deleteSingleExercise(exerciseId, userId);
        await createExercise({
          exercise: {
            name: values.exercise.name,
            url: values.exercise.azureName,
            reps: Number(values.exerciseReps),
            sets: Number(values.exerciseSets),
            description: values.exerciseDescription,
          },
          userId,
          dayId,
        });

        toast({
          variant: "default",
          title: "Uspešno izmenjena vežba!",
        });
      }

      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Greška",
        description: "Došlo je do greške prilikom obrade.",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <p className="text-sm border p-2">
            {variant === "create" ? "Dodaj novu vežbu" : "Izmeni"}
          </p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {variant === "create" ? "Kreiraj novu vežbu" : "Izmeni vežbu"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {/* Dropdown za izbor vežbe */}
            <FormField
              control={methods.control}
              name="exercise"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Dropdown
                      onChangeHandler={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  {/* Ručno prikazivanje grešaka iz nested objekta */}
                  {methods.formState.errors.exercise?.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {methods.formState.errors.exercise.name.message}
                    </p>
                  )}
                  {methods.formState.errors.exercise?.azureName && (
                    <p className="text-sm text-red-500 mt-1">
                      {methods.formState.errors.exercise.azureName.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Ponavljanja i serije */}
            <div className="flex items-center gap-4">
              <FormField
                control={methods.control}
                name="exerciseReps"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <label htmlFor="exerciseReps" className="text-right my-2">
                      Ponavljanja
                    </label>
                    <FormControl>
                      <Input id="exerciseReps" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="exerciseSets"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <label htmlFor="exerciseSets" className="text-right my-2">
                      Serija
                    </label>
                    <FormControl>
                      <Input id="exerciseSets" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Opis vežbe */}
            <FormField
              control={methods.control}
              name="exerciseDescription"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="exerciseDescription"
                    className="text-right my-2"
                  >
                    Opis vežbe
                  </label>
                  <FormControl>
                    <Textarea
                      id="exerciseDescription"
                      className="w-full min-h-[150px]"
                      placeholder="Unesite detaljan opis vežbe..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dugmad */}
            <DialogFooter className="flex justify-end gap-4">
              <DialogClose asChild>
                <Button variant="outline">Otkaži</Button>
              </DialogClose>

              <Button
                variant="gold"
                type="submit"
                disabled={methods.formState.isSubmitting}
              >
                {variant === "create" ? "Kreiraj" : "Izmeni"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default CreateUpdateExerciseModal;
