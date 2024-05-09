"use server";

import { SurveyParams, UserSurveyDTO } from "@/types/survey";
import { connectToDatabase } from "../database/mongodb";
import Survey from "../database/mongodb/models/survey.model";
import { handleError } from "../utils";
import User from "../database/mongodb/models/user.model";
import { mapUserSurveyToDTO } from "../database/mongodb/mappers/surveyMapper";
import mongoose from "mongoose";

export const createSurvey = async (surveyData: SurveyParams) => {
  try {
    await connectToDatabase();
    const newSurvey = await Survey.create(surveyData);
    return JSON.parse(JSON.stringify(newSurvey));
  } catch (error) {
    handleError(error);
  }
};

export const getUserAndSurveyInfo = async (Id: string) => {
  try {
    await connectToDatabase();

    const objectId = new mongoose.Types.ObjectId(Id);

    console.log("objectId:", objectId);

    const user = await User.findById(objectId).exec();

    const survey = await Survey.findOne({ userId: Id }).exec();

    if (!user || !survey) return null;

    const userInfo: UserSurveyDTO = mapUserSurveyToDTO(user, survey);

    return JSON.parse(JSON.stringify(userInfo));
  } catch (error) {
    handleError(error);
  }
};
