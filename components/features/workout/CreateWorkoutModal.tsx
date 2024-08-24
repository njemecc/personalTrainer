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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkoutFormSchema } from "@/lib/validations/workoutPlan/createWorkoutValidator";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Dropdown from "@/components/ui/Dropdown";

export function CreateWorkoutModal({ userId }: { userId: string }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    { name: string; azureName: string } | undefined
  >(undefined);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof createWorkoutFormSchema>>({
    resolver: zodResolver(createWorkoutFormSchema),
  });

  const dayRef = useRef<HTMLInputElement>(null);
  const trainingRef = useRef<HTMLInputElement>(null);
  const excerciseSetsRef = useRef<HTMLInputElement>(null);
  const excerciseRepsRef = useRef<HTMLInputElement>(null);

  const addExercise = () => {
    if (!selectedExercise) {
      toast({
        variant: "destructive",
        title: "Morate izabrati vežbu!",
      });
      return;
    }

    const newExercise: CreateExerciseDto = {
      name: selectedExercise.name,
      sets: parseInt(excerciseSetsRef.current!.value),
      reps: parseInt(excerciseRepsRef.current!.value),
      url: selectedExercise.azureName,
    };

    if (!newExercise.sets || !newExercise.reps) {
      toast({
        variant: "destructive",
        title: "Sva polja za vežbu su obavezna!",
      });
      return;
    }

    //@ts-ignore
    setExercises((prevExercises) => [...prevExercises, newExercise]);

    // Reset values for exercise
    setSelectedExercise(undefined);
    excerciseSetsRef.current!.value = "";
    excerciseRepsRef.current!.value = "";
  };

  const createWorkoutPlanOneSubmit = async (data: any) => {
    const planToSend: CreateWorkoutPlanParams = {
      userId,
      days: [
        {
          dayName: dayRef.current!.value,
          workoutName: trainingRef.current!.value,
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
    setExercises([]);
  };

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
        <form onSubmit={form.handleSubmit(createWorkoutPlanOneSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dayName" className="text-right">
                Dan
              </Label>
              <Input
                required
                ref={dayRef}
                id="dayName"
                defaultValue="Ponedeljak"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workoutName" className="text-right">
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
            <div className="flex flex-col">
              <Dropdown
                value={selectedExercise}
                onChangeHandler={setSelectedExercise}
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
              {exercises?.map((exercise, index) => (
                <p key={index}>
                  ✅ {exercise.name} {exercise.sets} X {exercise.reps}
                </p>
              ))}
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button
                className="hover:text-white"
                type="button"
                onClick={addExercise}
              >
                + Vežba
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
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
