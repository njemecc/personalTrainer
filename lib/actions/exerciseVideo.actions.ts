import {
  CreateExerciseVideoParams,
  UpdateExerciseVideoParams,
} from "@/types/exerciseVideo";
import { connectToDatabase } from "../database/mongodb";
import ExerciseVideo from "../database/mongodb/models/exerciseVideo.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const getAllExerciseVideos = async () => {
  try {
    await connectToDatabase();

    const exerciseVideos = await ExerciseVideo.find();

    return JSON.parse(JSON.stringify(exerciseVideos));
  } catch (error) {
    handleError(error);
  }
};

export const getExerciseVideo = async (exerciseVideoId: string) => {
  try {
    await connectToDatabase();

    const exerciseVideo = await ExerciseVideo.findById(exerciseVideoId);
    if (!exerciseVideo) throw new Error("ExerciseVideo not found");

    return JSON.parse(JSON.stringify(exerciseVideo));
  } catch (error) {
    handleError(error);
  }
};

export const createExerciseVideo = async (
  exerciseVideo: CreateExerciseVideoParams
) => {
  try {
    await connectToDatabase();

    const newExerciseVideo = await ExerciseVideo.create(exerciseVideo);
    if (!newExerciseVideo) throw new Error("ExerciseVideo was not created");

    return JSON.parse(JSON.stringify(newExerciseVideo));
  } catch (error) {
    handleError(error);
  }
};

export const updateExerciseVideo = async (
  exerciseVideoId: string,
  exerciseVideo: UpdateExerciseVideoParams
) => {
  try {
    await connectToDatabase();

    const updatedExerciseVideo = await ExerciseVideo.findOneAndUpdate(
      { exerciseVideoId },
      exerciseVideo,
      {
        new: true,
      }
    );
    if (!updatedExerciseVideo) throw new Error("ExerciseVideo was not updated");

    return JSON.parse(JSON.stringify(updatedExerciseVideo));
  } catch (error) {
    handleError(error);
  }
};

export const deleteExerciseVideo = async (exerciseVideoId: string) => {
  try {
    await connectToDatabase();

    const exerciseVideoToDelete = await ExerciseVideo.findOne({
      exerciseVideoId,
    });

    if (exerciseVideoToDelete) throw new Error("ExerciseVideo was not found");

    const deletedExericseVideo = await ExerciseVideo.findByIdAndDelete(
      exerciseVideoToDelete._id
    );
    revalidatePath("/");

    return deletedExericseVideo
      ? JSON.parse(JSON.stringify(deletedExericseVideo))
      : null;
  } catch (error) {
    handleError(error);
  }
};
