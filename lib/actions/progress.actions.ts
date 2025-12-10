"use server";

import { connectToDatabase } from "../database/mongodb";
import Progress from "../database/mongodb/models/progress.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export interface CreateProgressParams {
  userId: string;
  date?: Date;
  weight?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arm?: number;
    thigh?: number;
  };
  photos?: Array<{
    url: string;
    type?: 'front' | 'side' | 'back' | 'other';
  }>;
  notes?: string;
}

export const createProgress = async (progressData: CreateProgressParams) => {
  try {
    await connectToDatabase();

    const newProgress = await Progress.create({
      ...progressData,
      date: progressData.date || new Date(),
    });

    revalidatePath(`/progress/${progressData.userId}`);
    revalidatePath(`/admin/users/${progressData.userId}`);

    return JSON.parse(JSON.stringify(newProgress));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getProgressByUserId = async (userId: string) => {
  try {
    await connectToDatabase();

    const progressEntries = await Progress.find({ userId })
      .sort({ date: -1 }) // Najnoviji prvi
      .lean();

    return JSON.parse(JSON.stringify(progressEntries));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getLatestProgress = async (userId: string) => {
  try {
    await connectToDatabase();

    const latestProgress = await Progress.findOne({ userId })
      .sort({ date: -1 })
      .lean();

    return latestProgress ? JSON.parse(JSON.stringify(latestProgress)) : null;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteProgress = async (progressId: string) => {
  try {
    await connectToDatabase();

    const deleted = await Progress.findByIdAndDelete(progressId);

    if (!deleted) {
      throw new Error("Progress entry not found");
    }

    revalidatePath(`/progress/${deleted.userId}`);
    revalidatePath(`/admin/users/${deleted.userId}`);

    return { success: true };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateProgress = async (
  progressId: string,
  updateData: Partial<CreateProgressParams>
) => {
  try {
    await connectToDatabase();

    const updated = await Progress.findByIdAndUpdate(
      progressId,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      throw new Error("Progress entry not found");
    }

    revalidatePath(`/progress/${updated.userId}`);
    revalidatePath(`/admin/users/${updated.userId}`);

    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

