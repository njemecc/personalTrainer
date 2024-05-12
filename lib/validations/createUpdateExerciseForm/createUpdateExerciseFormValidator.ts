import * as z from "zod";

export const createUpdateExerciseFormSchema = z.object({
  exerciseName: z.string({
    required_error: "Naziv vežbe je obavezno polje.",
  }),
  exerciseUrl: z.string({
    required_error: "Link ka video snimku je obavezno polje.",
  }),
  exerciseReps: z.string({
    required_error: "Broj ponavljanja je obavezno polje.",
  }),
  exerciseSets: z.string({
    required_error: "Broj serija je obavezno polje.",
  }),
});
