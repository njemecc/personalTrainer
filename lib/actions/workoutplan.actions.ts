"use server";

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
