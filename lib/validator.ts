import * as z from "zod";

export const surveyFormSchema = z.object({
  telefon: z.string({
    required_error: "Broj telefona je obavezno polje.",
  }),
  visina: z.string({
    required_error: "Visina je obavezno polje.",
  }),
  tezina: z.string({
    required_error: "Težina je obavezno polje.",
  }),
  datumRodjenja: z.date({
    required_error: "Datum rodjenja je obavezno polje.",
  }),
  radniStatus: z.string({
    required_error: "Status zaposlenja je obavezno polje.",
  }),
  radnoVreme: z.string().optional(),
  brojObroka: z.string({
    required_error: "Broj obroka obavezno polje.",
  }),
  satiSpavanja: z.string({
    required_error: "obavezno polje.",
  }),
  tipOsobe: z.string({
    required_error: "obavezno polje.",
  }),
  zdravstveniProblem: z.string().optional(),
  dodatno: z.string().optional(),
  razlogPrestanka: z.string().optional(),
  imaliTrenera: z.string().optional(),
  ocekivanja: z.string().optional(),
  ranijeTrenirali: z.string({
    required_error: "obavezno polje.",
  }),
});
