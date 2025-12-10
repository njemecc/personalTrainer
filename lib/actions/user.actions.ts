"use server";

import { CreateUserParams, UpdateUserParams } from "@/types/users";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongodb";
import User from "../database/mongodb/models/user.model";
import NutritionPlan from "../database/mongodb/models/nutritionPlan.model";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs";

export const getAllUsers = async () => {
  try {
    await connectToDatabase();

    const allUsers = await User.find();

    return JSON.parse(JSON.stringify(allUsers));
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: clerkId });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("🔄 Connecting to database...");
    await connectToDatabase();
    console.log("✅ Database connected successfully");

    console.log("🔄 Attempting to create user with data:", user);
    const newUser = await User.create(user);
    console.log("✅ User created successfully with ID:", newUser._id);
    console.log("📊 Full user object:", newUser);

    const result = JSON.parse(JSON.stringify(newUser));
    console.log("📤 Returning user data:", result);
    return result;
  } catch (error) {
    console.error("❌ Database error creating user:", error);

    // Specifično rukovanje MongoDB greškama
    if (error instanceof Error) {
      console.log("🔍 Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      if (error.message.includes("E11000") && error.message.includes("email")) {
        throw new Error("User with this email already exists");
      }
      if (
        error.message.includes("E11000") &&
        error.message.includes("username")
      ) {
        throw new Error("Username already taken");
      }
      if (
        error.message.includes("E11000") &&
        error.message.includes("clerkId")
      ) {
        throw new Error("User with this Clerk ID already exists");
      }
    }

    handleError(error);
  }
};

export const updateUser = async (id: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ id }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const setUserActiveStatus = async (
  userId: string,
  isActive: boolean
) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { is_active: isActive },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Korisnik nije pronađen");
    }

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    //pronalazimo usera
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }
    //skidanje referenci ako ih ima

    // na kraju samo brisanje usera
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export const setSurveyCompletedOnClerk = async (userId: string) => {
  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        isSurveyCompleted: true,
      },
    });
  } catch (error) {
    handleError(error);
  }
};

// NUTRITION PLAN MANAGEMENT FUNCTIONS

// Add a nutrition plan to a user
export const assignNutritionPlanToUser = async (
  userId: string,
  planId: string
) => {
  try {
    // Ensure database connection is established
    const conn = await connectToDatabase();
    if (!conn) throw new Error("Failed to connect to database");

    // Find the nutrition plan
    const plan = await NutritionPlan.findById(planId);
    if (!plan) {
      throw new Error("Plan ishrane nije pronađen");
    }

    // Add plan to user's nutrition plans
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          nutritionPlans: {
            planId: plan._id,
            name: plan.name,
            url: plan.url,
            assignedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!user) {
      throw new Error("Korisnik nije pronađen");
    }

    // Use correct path format for revalidation
    revalidatePath("/admin/users");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error in assignNutritionPlanToUser:", error);
    handleError(error);
    throw error;
  }
};

// Remove a nutrition plan from a user
export const removeNutritionPlanFromUser = async (
  userId: string,
  planId: string
) => {
  try {
    await connectToDatabase();

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { nutritionPlans: { planId } } },
      { new: true }
    );

    if (!user) {
      throw new Error("Korisnik nije pronađen");
    }

    revalidatePath(`/admin/users/${userId}`);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Get all nutrition plans assigned to a user
export const getUserNutritionPlans = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Korisnik nije pronađen");
    }

    return JSON.parse(JSON.stringify(user.nutritionPlans || []));
  } catch (error) {
    handleError(error);
    throw error;
  }
};
