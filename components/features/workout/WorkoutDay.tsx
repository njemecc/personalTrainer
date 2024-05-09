"use client";

import { Exercise } from "@/types/exercise";
import SingleWorkoutCard from "./SingleExerciseCard";

export function WorkoutDay({
  exercises,
  userId,
}: {
  exercises: Exercise[];
  userId: string;
}) {
  return exercises.map((exercise) => (
    <SingleWorkoutCard
      key={exercise._id}
      _id={exercise._id}
      name={exercise.name}
      sets={exercise.sets}
      reps={exercise.reps}
      url={exercise.url}
      userId={userId}
    />
  ));
}
