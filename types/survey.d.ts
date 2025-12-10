export type SurveyParams = {
  userId: string;
  telefon: string;
  visina: string;
  tezina: string;
  datumRodjenja: Date;
  radniStatus: string;
  radnoVreme?: string;
  brojObroka: string;
  satiSpavanja: string;
  tipOsobe: string;
  zdravstveniProblem?: string;
  dodatno?: string;
  razlogPrestanka?: string;
  imaliTrenera?: string;
  ocekivanja?: string;
  ranijeTrenirali: string;
};

export interface UserSurveyDTO {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  photo: string;
  telefon: string;
  visina: string;
  tezina: string;
  datumRodjenja: Date;
  radniStatus: string;
  radnoVreme?: string;
  brojObroka: string;
  satiSpavanja: string;
  tipOsobe: string;
  zdravstveniProblem?: string;
  dodatno?: string;
  razlogPrestanka?: string;
  imaliTrenera?: string;
  ocekivanja?: string;
  ranijeTrenirali: string;
}
