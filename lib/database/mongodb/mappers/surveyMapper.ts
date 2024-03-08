import { UserSurveyDTO } from "@/types/survey";
import { CreateUserParams } from "@/types/users";

export const mapUserSurveyToDTO = (
  user: CreateUserParams,
  survey: any
): UserSurveyDTO => {
  const { _id, userId, ...restData } = survey._doc;
  const { email, first_name, last_name, is_active, photo } = user;

  return {
    email,
    firstName: first_name,
    lastName: last_name,
    isActive: is_active,
    photo,
    ...restData,
  };
};
