"use server";

import { connectToDatabase } from "../database/mongodb";
import NutritionPlan from "../database/mongodb/models/nutritionPlan.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const createNutritionPlan = async ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => {
  try {
    await connectToDatabase();

    const newNutritionPlan = new NutritionPlan({ name, url });
    await newNutritionPlan.save();

    revalidatePath("/admin/planIshrane");
    return JSON.parse(JSON.stringify(newNutritionPlan));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getAllNutritionPlans = async () => {
  try {
    await connectToDatabase();
    const nutritionPlans = await NutritionPlan.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(nutritionPlans));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const updateNutritionPlan = async ({
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
    const updated = await NutritionPlan.findByIdAndUpdate(
      id,
      { name, url },
      { new: true }
    );

    revalidatePath("/admin/planIshrane");
    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteNutritionPlan = async (id: string) => {
  try {
    await connectToDatabase();
    const deleted = await NutritionPlan.findByIdAndDelete(id);

    revalidatePath("/admin/planIshrane");
    return JSON.parse(JSON.stringify(deleted));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const getNutritionPlanById = async (id: string) => {
  try {
    await connectToDatabase();
    const nutritionPlan = await NutritionPlan.findById(id);
    
    if (!nutritionPlan) {
      throw new Error("Plan ishrane nije pronađen");
    }
    
    return JSON.parse(JSON.stringify(nutritionPlan));
  } catch (error) {
    handleError(error);
    throw error;
  }
};
