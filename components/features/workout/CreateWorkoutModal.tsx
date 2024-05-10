"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateExerciseDto, Exercise } from "@/types/exercise";
import { createWorkoutPlan } from "@/lib/actions/workoutplan.actions";
import { CreateWorkoutPlanParams } from "@/types/workoutPlan";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkoutFormSchema } from "@/lib/validations/workoutPlan/createWorkoutValidator";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export function CreateWorkoutModal({ userId }: { userId: string }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const { toast } = useToast();

  const addExercise = () => {
    const newExercise: CreateExerciseDto = {
      name: excerciseNameRef!.current!.value,
      sets: parseInt(excerciseSetsRef!.current!.value),
      reps: parseInt(excerciseRepsRef!.current!.value),
      url: excerciseUrlRef!.current!.value,
    };

    if (
      !newExercise.name ||
      !newExercise.sets ||
      !newExercise.reps ||
      !newExercise.url
    ) {
      toast({
        variant: "destructive",
        title: "Sva polja za vezbu su obavezna!",
      });

      return;
    }

    setExercises((prevExercises) => [...prevExercises, newExercise]);

    //reset values for excercise
    excerciseNameRef!.current!.value = "";
    excerciseSetsRef!.current!.value = "";
    excerciseRepsRef!.current!.value = "";
    excerciseUrlRef!.current!.value = "";
  };

  const dayRef = useRef<HTMLInputElement>(null);
  const trainingRef = useRef<HTMLInputElement>(null);
  const excerciseNameRef = useRef<HTMLInputElement>(null);
  const excerciseUrlRef = useRef<HTMLInputElement>(null);
  const excerciseSetsRef = useRef<HTMLInputElement>(null);
  const excerciseRepsRef = useRef<HTMLInputElement>(null);

  const createWorkoutPlanOneSubmit = async () => {
    const planToSend: CreateWorkoutPlanParams = {
      userId,
      days: [
        {
          //@ts-ignore
          dayName: dayRef!.current!.value,
          workoutName: trainingRef!.current!.value,
          exercises,
        },
      ],
    };

    if (
      !planToSend.days[0].dayName ||
      !planToSend.days[0].workoutName ||
      planToSend?.days[0]?.exercises.length === 0
    ) {
      toast({
        variant: "destructive",
        title: "Sva polja za trening su obavezna!",
      });

      return;
    }

    await createWorkoutPlan(planToSend);

    //reset the exercises array
    setExercises([]);
  };

  const form = useForm<z.infer<typeof createWorkoutFormSchema>>({
    resolver: zodResolver(createWorkoutFormSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:w-1/4" variant="outline">
          Dodaj Trening
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Dodaj novi trening</DialogTitle>
          <DialogDescription>
            Napravi izmene trening plana za konkretno ovog korisnika.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Dan
              </Label>
              <Input
                required
                ref={dayRef}
                id="workoutDay"
                defaultValue="Ponedeljak"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="training" className="text-right">
                Naziv treninga
              </Label>
              <Input
                ref={trainingRef}
                id="workoutName"
                defaultValue="Ledja-triceps"
                className="col-span-3"
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="exerciseName" className="text-left">
                Naziv Vezbe
              </Label>
              <Input
                ref={excerciseNameRef}
                id="exerciseName"
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center ">
              <Label htmlFor="exerciseUrl" className="text-left">
                Video url
              </Label>
              <Input
                ref={excerciseUrlRef}
                id="exerciseUrl"
                defaultValue=""
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="exerciseReps" className="text-right">
                Ponavljanja
              </Label>
              <Input
                ref={excerciseRepsRef}
                id="exerciseReps"
                type="number"
                className="col-span-3"
              />

              <Label htmlFor="exerciseSets" className="text-right">
                Serija
              </Label>
              <Input
                ref={excerciseSetsRef}
                id="exerciseSets"
                type="number"
                className="col-span-3"
              />
            </div>
            <div>
              {exercises?.map((exercise) => (
                <p key={exercise.url}>
                  ✅ {exercise.name} {exercise.sets} X {exercise.reps}
                </p>
              ))}
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full ">
              <Button
                className="hover:text-white"
                type="button"
                onClick={addExercise}
              >
                + Vezba
              </Button>

              <DialogClose>
                <Button
                  className="hover:text-white"
                  type="submit"
                  onClick={createWorkoutPlanOneSubmit}
                >
                  Dodaj
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
