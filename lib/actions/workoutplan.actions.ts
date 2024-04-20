"use server";

import { CreateWorkoutPlanParams } from "@/types/workoutPlan";
import { connectToDatabase } from "../database/mongodb";
import WorkoutPlan from "../database/mongodb/models/workoutplan.model";
import { handleError } from "../utils";

export const getWorkoutplanByUserId = async (id: string) => {
  try {
    await connectToDatabase();

    const workoutPlan = await WorkoutPlan.findOne({ userId: id });

    if (!workoutPlan) return null;

    return JSON.parse(JSON.stringify(workoutPlan));
  } catch (error) {
    handleError(error);
  }
};

export const createWorkoutPlan = async (
  newWorkout: CreateWorkoutPlanParams
) => {
  try {
    await connectToDatabase();

    const workoutPlanExists = await WorkoutPlan.findOne({
      userId: newWorkout.userId,
    });

    let newWorkoutPlan: CreateWorkoutPlanParams;

    if (workoutPlanExists === null) {
      newWorkoutPlan = await WorkoutPlan.create(newWorkout);
    } else {
      newWorkoutPlan = workoutPlanExists;
      newWorkoutPlan.days.push(newWorkout.days[0]);

      await WorkoutPlan.updateOne(
        { userId: newWorkout.userId },
        newWorkoutPlan
      );
    }

    return JSON.parse(JSON.stringify(newWorkoutPlan));
  } catch (error) {
    handleError(error);
  }
};
