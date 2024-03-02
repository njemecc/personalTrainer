"use server";

import { SurveyParams } from "@/types/survey";
import { connectToDatabase } from "../database/mongodb";
import Survey from "../database/mongodb/models/survey.model";
import { handleError } from "../utils";

export const createSurvey = async (surveyData: SurveyParams) => {
  try {
    await connectToDatabase();
    const newSurvey = await Survey.create(surveyData);
    return JSON.parse(JSON.stringify(newSurvey));
  } catch (error) {
    handleError(error);
  }
};
