"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongodb";
import WorkoutPlan from "../database/mongodb/models/workoutplan.model";
import { handleError } from "../utils";
import { CreateExerciseDto } from "@/types/exercise";
import Exercise from "../database/mongodb/models/exercise.model";
import { Day } from "@/types/workoutPlan";

export const deleteSingleExercise = async (exerciseId: string) => {
  try {
    await connectToDatabase();

    let workoutPlan = await WorkoutPlan.findOne({
      "days.exercises._id": exerciseId,
    });

    if (!workoutPlan) {
      return null;
    }

    workoutPlan.days.forEach((day:Day) => {
      day.exercises = day.exercises.filter(
        (exercise) => exercise._id != exerciseId
      );
    });

    await workoutPlan.save();

    revalidatePath(`/admin/users/[userId]`, "layout");

    return JSON.parse(JSON.stringify(workoutPlan));
  } catch (error) {
    handleError(error);

    throw error;
  }
};

export const createExercise = async ({
  exercise,
  userId,
  dayId,
}: {
  exercise: CreateExerciseDto;
  userId: string;
  dayId: string;
}) => {
  try {
    await connectToDatabase();

    let workoutPlan = await WorkoutPlan.findOne({
      "days._id": dayId,
    });

    workoutPlan.days.forEach((day:Day) => {
      if (day._id == dayId) {
        day.exercises.push(exercise);
      }
    });

    await workoutPlan.save();

    revalidatePath(`/admin/users/${userId}`);
    return JSON.parse(JSON.stringify(workoutPlan));
  } catch (error) {
    handleError(error);

    throw error;
  }
};

export const getAllExercises = async () => {
  try {
await connectToDatabase()

let allExercises = await Exercise.find()

return JSON.parse(JSON.stringify(allExercises))


  } catch (error) {
    handleError(error)
    throw error
  }
}