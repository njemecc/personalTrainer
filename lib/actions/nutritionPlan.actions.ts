"use server";

import { connectToDatabase } from "../database/mongodb";
import NutritionPlan from "../database/mongodb/models/nutritionPlan.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import User from "../database/mongodb/models/user.model";

// Inicijalizacija UT API-ja
const utapi = new UTApi();

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

    // Pronađi plan pre brisanja da bismo imali URL
    const planToDelete = await NutritionPlan.findById(id);

    if (!planToDelete) {
      throw new Error("Plan ishrane nije pronađen");
    }

    // Izbrišemo plan iz baze
    const deleted = await NutritionPlan.findByIdAndDelete(id);

    // Pokušamo da izbrišemo fajl iz UploadThing-a
    try {
      // Parsiramo URL za izvlačenje fileKey-a
      const fileUrl = planToDelete.url;

      // Pokušavamo da izvučemo ključ iz URL-a pomoću regex-a
      // UploadThing URL je obično u formatu: https://utfs.io/f/{fileKey}
      const regex = /\/f\/([^\/]+)($|\?)/;
      const match = fileUrl.match(regex);
      const fileKey = match ? match[1] : null;

      if (fileKey) {
        // Brišemo fajl iz UploadThing skladišta
        await utapi.deleteFiles(fileKey);
        console.log(
          `Fajl sa ključem ${fileKey} uspešno izbrisan iz UploadThing-a`
        );
      } else {
        console.warn(
          "Nije moguće ekstraktovati ključ fajla iz URL-a:",
          fileUrl
        );
      }
    } catch (deleteError) {
      console.error("Greška pri brisanju fajla iz UploadThing-a:", deleteError);
      // Nastavimo izvršavanje iako nismo uspeli da obrišemo fajl
    }

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

export const getNutritionPlanByUserId = async (userId: string) => {
  try {
    console.log("Searching for nutrition plan for user:", userId);
    await connectToDatabase();

    const user = await User.findOne({ _id: userId });

    if (!user || !user.nutritionPlans || user.nutritionPlans.length === 0) {
      console.log("No nutrition plan found in database");
      return null;
    }

    // Pretpostavljamo da želiš poslednji plan
    const latestPlan = user.nutritionPlans[user.nutritionPlans.length - 1];

    console.log("Found nutrition plan:", latestPlan.name);
    return JSON.parse(JSON.stringify(latestPlan));
  } catch (error) {
    console.error("Error while fetching nutrition plan:", error);
    handleError(error);
    throw error;
  }
};

export const getAllNutritionPlansByUserId = async (userId: string) => {
  try {
    console.log("Searching for all nutrition plans for user:", userId);
    await connectToDatabase();

    const user = await User.findOne({ _id: userId });

    if (!user || !user.nutritionPlans || user.nutritionPlans.length === 0) {
      console.log("No nutrition plans found in database");
      return [];
    }

    // Vrati sve planove sortirane po datumu (najnoviji prvi)
    const allPlans = user.nutritionPlans
      .map((plan: any) => ({
        ...plan.toObject(),
        assignedAt: plan.assignedAt || new Date(),
      }))
      .sort(
        (a: any, b: any) =>
          new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
      );

    console.log(`Found ${allPlans.length} nutrition plan(s)`);
    return JSON.parse(JSON.stringify(allPlans));
  } catch (error) {
    console.error("Error while fetching all nutrition plans:", error);
    handleError(error);
    throw error;
  }
};
