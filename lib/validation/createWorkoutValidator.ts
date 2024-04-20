import * as z from "zod";

export const createWorkoutFormSchema = z.object({
  workoutName: z.string({
    required_error: "Naziv treninga je obavezno polje.",
  }),
  dayRef: z.string({
    required_error: "Dan treninga je obavezno polje.",
  }),
});
