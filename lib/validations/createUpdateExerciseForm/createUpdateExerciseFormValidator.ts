import { youtubeEmbedUrlPattern } from "@/constants";
import * as z from "zod";

export const createUpdateExerciseFormSchema = z.object({
  exercise: z.object({
    name: z.string({
      required_error: "Naziv vežbe je obavezno polje.",
    }),
    azureName: z.string()

  }),
  exerciseReps: z.string({
    required_error: "Broj ponavljanja je obavezno polje.",
  }).min(1, "Broj ponavljanja je obavezno polje."),
  exerciseSets: z.string({
    required_error: "Broj serija je obavezno polje.",
  }).min(1, "Broj serija je obavezno polje."),
  exerciseDescription: z.string()
});
