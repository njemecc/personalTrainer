import { ExerciseDetails } from "../exercise";

export type WorkoutPlanDetails = {
  userId: string;
  exercises: ExerciseDetails[];
};
