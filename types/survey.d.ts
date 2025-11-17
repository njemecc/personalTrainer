export interface UserSurveyDTO {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  photo: string;
  telefon: string;
  visina: number;
  tezina: number;
  datumRodjenja: Date;
  radniStatus: string;
  brojObroka: number;
  satiSpavanja: number;
  tipOsobe: string;
  zdravstveniProblem: string;
  dodatno: string;
  razlogPrestanka: string;
  imaliTrenera: string;
  ocekivanja: string;
  ranijeTrenirali: string;
}
