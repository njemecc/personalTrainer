import { ExerciseDetails } from "../exercise";

export type WorkoutPlanDetails = {
  _id: string;
  userId: string;
  exercises: ExerciseDetails[];
};

export type WorkoutPlanDetailsDTO = {
  userId: string;
  exercises: ExerciseDetails[];
};
