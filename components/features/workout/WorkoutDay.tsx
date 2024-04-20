"use client";

import { Exercise } from "@/types/exercise";
import SingleWorkoutCard from "./SingleExerciseCard";

export function WorkoutDay({ exercises }: { exercises: Exercise[] }) {
  return exercises.map((exercise) => (
    <SingleWorkoutCard
      name={exercise.name}
      sets={exercise.sets}
      reps={exercise.reps}
      url={exercise.url}
    />
  ));
}
