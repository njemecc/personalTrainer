export type ExerciseDetails = {
  _id: string;
  wourkoutPlanId: string;
  exerciseVideoId: string;
  sets: number;
  reps: number;
  weight: number;
  day: string;
  time: string;
  description:string
};

export type ExerciseDetailsDTO = {
  sets: number;
  reps: number;
  weight: number;
  day: string;
  time: string;
  exerciseVideoName: string;
  exerciseVideoUrl: string;
  exerciseVideoDescription: string;
  exerciseVideoCategory: string;
  description:string
};

export type CreateExerciseDto = {
  name: string;
  sets: number;
  reps: number;
  url: string;
  description:string
};

export type Exercise = {
  _id?: string;
  name: string;
  sets: number;
  reps: number;
  url: string;
  description:string
};
