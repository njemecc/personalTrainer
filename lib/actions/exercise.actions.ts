"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongodb";
import WorkoutPlan from "../database/mongodb/models/workoutplan.model";
import { handleError } from "../utils";

export const deleteSingleExercise = async (exerciseId: string) => {
  try {
    await connectToDatabase();

    let workoutPlan = await WorkoutPlan.findOne({
      "days.exercises._id": exerciseId,
    });

    if (!workoutPlan) {
      return null;
    }

    workoutPlan.days.forEach((day) => {
      day.exercises = day.exercises.filter(
        (exercise) => exercise._id != exerciseId
      );
    });

    await workoutPlan.save();

    revalidatePath(`/admin/users`);
    console.log("ep ep");

    return JSON.parse(JSON.stringify(workoutPlan));
  } catch (error) {
    handleError(error);

    throw error;
  }
};
