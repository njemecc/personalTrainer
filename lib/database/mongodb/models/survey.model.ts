import { Schema, model, models } from "mongoose";

const SurveySchema = new Schema({
  userId: { type: String, required: true },
  telefon: { type: String, required: true },
  visina: { type: String, required: true },
  tezina: { type: String, required: true },
  datumRodjenja: { type: Date, required: true },
  radniStatus: { type: String, required: true },
  radnoVreme: { type: String },
  brojObroka: { type: String, required: true },
  satiSpavanja: { type: String, required: true },
  tipOsobe: { type: String, required: true },
  zdravstveniProblem: { type: String },
  dodatno: { type: String },
  razlogPrestanka: { type: String },
  imaliTrenera: { type: String },
  ocekivanja: { type: String },
  ranijeTrenirali: { type: String, required: true },
});

const Survey = models.Survey || model("Survey", SurveySchema);

export default Survey;
