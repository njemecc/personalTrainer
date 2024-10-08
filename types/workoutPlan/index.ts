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
      _id: string;
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
      _id: string;
    }
  ];
};

export type CreateWorkoutPlanParams = {
  userId: string;
  days: Day[]
};

export type Day = {
  _id?:string;
  dayName:string;
  workoutName:string;
  exercises:Exercise[]
}