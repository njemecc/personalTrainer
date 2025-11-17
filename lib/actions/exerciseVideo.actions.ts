"use server";

import { connectToDatabase } from "../database/mongodb";
import Exercise from "../database/mongodb/models/exercise.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const createVideoExercise = async ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => {
  try {
    await connectToDatabase();

    const newExercise = new Exercise({ name, url });
    await newExercise.save();

    revalidatePath("/admin/galerija");
    return JSON.parse(JSON.stringify(newExercise));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAllVideoExercises = async () => {
  try {
    await connectToDatabase();
    const exercises = await Exercise.find();
    return JSON.parse(JSON.stringify(exercises));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateVideoExercise = async ({
  id,
  name,
  url,
}: {
  id: string;
  name: string;
  url: string;
}) => {
  try {
    await connectToDatabase();
    const updated = await Exercise.findByIdAndUpdate(
      id,
      { name, url },
      { new: true }
    );

    revalidatePath("/admin/videos");
    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteVideoExercise = async (id: string) => {
  try {
    await connectToDatabase();
    const deleted = await Exercise.findByIdAndDelete(id);

    revalidatePath("/admin/videos");
    return JSON.parse(JSON.stringify(deleted));
  } catch (error) {
    handleError(error);
    throw error;
  }
};
