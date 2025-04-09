"use server";

import { CreateUserParams, UpdateUserParams } from "@/types/users";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongodb";
import User from "../database/mongodb/models/user.model";
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

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
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
      privateMetadata: {
        isSurveyCompleted: "true"
      }
    })
  } catch (error) {
    handleError(error)
  }

}
