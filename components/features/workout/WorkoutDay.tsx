"use client";

import { Exercise } from "@/types/exercise";
import SingleWorkoutCard from "./SingleExerciseCard";

export function WorkoutDay({ exercises }: { exercises: Exercise[] }) {
  console.log(exercises);

  return exercises.map((exercise) => (
    <SingleWorkoutCard
      key={exercise._id}
      _id={exercise._id}
      name={exercise.name}
      sets={exercise.sets}
      reps={exercise.reps}
      url={exercise.url}
    />
  ));
}
