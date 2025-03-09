import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";

// zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUpdateExerciseFormSchema } from "@/lib/validations/createUpdateExerciseForm/createUpdateExerciseFormValidator";
import {
  createExercise,
  deleteSingleExercise,
} from "@/lib/actions/exercise.actions";
import { DialogClose } from "@radix-ui/react-dialog";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import Dropdown from "@/components/ui/Dropdown";

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
  const methods = useForm<z.infer<typeof createUpdateExerciseFormSchema>>({
    resolver: zodResolver(createUpdateExerciseFormSchema),
    defaultValues: {
      exercise: {},
      exerciseReps: reps?.toString() || "",
      exerciseSets: sets?.toString() || "",
      exerciseDescription: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createUpdateExerciseFormSchema>
  ) => {
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
    } else if (variant === "update") {
      if (exerciseId) {
        await deleteSingleExercise(exerciseId);
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
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog>
        <DialogTrigger>
          <p className="text-sm border p-2">
            {variant === "create" ? "Kreiraj novu vežbu" : "Izmeni"}
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
            <div className="flex flex-col">
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
                  </FormItem>
                )}
              />
            </div>

            {/* Ponavljanja i serije */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col w-1/2">
                <Label htmlFor="exerciseReps" className="text-right my-2">
                  Ponavljanja
                </Label>
                <Input
                  {...methods.register("exerciseReps")}
                  id="exerciseReps"
                  type="number"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <Label htmlFor="exerciseSets" className="text-right my-2">
                  Serija
                </Label>
                <Input
                  {...methods.register("exerciseSets")}
                  id="exerciseSets"
                  type="number"
                />
              </div>
            </div>

            {/* Tekstualni opis */}
            <div className="flex flex-col mt-4">
              <Label htmlFor="exerciseDescription" className="text-right my-2">
                Opis vežbe
              </Label>
              <Textarea
                {...methods.register("exerciseDescription")}
                id="exerciseDescription"
                className="w-full min-h-[150px]"
                placeholder="Unesite detaljan opis vežbe..."
              />
            </div>

            {/* Dugmad */}
            <div className="flex justify-end gap-4">
              <DialogClose>
                <Button
                  variant="gold"
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                >
                  {variant === "create" ? "Kreiraj" : "Izmeni"}
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default CreateUpdateExerciseModal;
