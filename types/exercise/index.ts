export type ExerciseDetails = {
  _id: string;
  wourkoutPlanId: string;
  exerciseVideoId: string;
  sets: number;
  reps: number;
  weight: number;
  day: string;
  time: string;
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
};
