import { Exercise, ExerciseDetails } from "../exercise";

export type WorkoutPlanDetails = {
  _id: string;
  userId: string;
  exercises: ExerciseDetails[];
};

export type WorkoutPlanDetailsDTO = {
  userId: string;
  exercises: ExerciseDetails[];
};

export type WorkoutPlan = {
  days: [
    {
      dayName: string;
      workoutName: string;
      exercises: Exercise[];
    }
  ];
};

export type UserWorkoutParams = {
  id: string;
  userId: string;
  days: [
    {
      dayName: string;
      workoutName: string;
      exercises: Exercise[];
    }
  ];
};
