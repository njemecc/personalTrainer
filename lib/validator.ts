import * as z from "zod";

export const surveyFormSchema = z.object({
  email: z.string(),
  telefon: z.number(),
  visina: z.string(),
  tezina: z.string(),
  datumRodjenja: z.date(),
  radniStatus: z.string(),
  radnoVreme: z.string().optional(),
  brojObroka: z.string(),
  satiSpavanja: z.string(),
  tipOsobe: z.string(),
  zdravstveniProblem: z.string(),
  dodatno: z.string(),
  razlogPrestanka: z.string(),
  imaliTrenera: z.string(),
  ocekivanja: z.string(),
  ranijeTrenirali: z.string(),
});
