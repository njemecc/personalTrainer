import * as z from "zod";

export const surveyFormSchema = z.object({
  email: z.string(),
  phoneNumber: z.number(),
});
