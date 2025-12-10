"use server";

import { SurveyParams, UserSurveyDTO } from "@/types/survey";
import { connectToDatabase } from "../database/mongodb";
import Survey from "../database/mongodb/models/survey.model";
import { handleError } from "../utils";
import User from "../database/mongodb/models/user.model";
import { mapUserSurveyToDTO } from "../database/mongodb/mappers/surveyMapper";
import mongoose from "mongoose";
import { sendSurveyNotificationEmail } from "../utils/email";

export const createSurvey = async (surveyData: SurveyParams) => {
  try {
    await connectToDatabase();
    const newSurvey = await Survey.create(surveyData);

    // Dobijanje korisničkih podataka za email
    try {
      const user = await User.findById(surveyData.userId).exec();

      if (user) {
        // Slanje emaila sa podacima ankete
        await sendSurveyNotificationEmail(surveyData, {
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        });
      } else {
        console.warn(
          "Korisnik nije pronađen za slanje emaila, userId:",
          surveyData.userId
        );
      }
    } catch (emailError) {
      // Ne prekidamo proces ako email ne uspe - samo logujemo grešku
      console.error("Greška pri slanju email notifikacije:", emailError);
    }

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
