export type ExerciseVideoDetails = {
  _id: string;
  name: string;
  videoUrl: string;
  description: string;
  category: string;
};

export type ExerciseVideoDetailsDTO = {
  name: string;
  videoUrl: string;
  description: string;
  category: string;
};

export type CreateExerciseVideoParams = {
  name: string;
  videoUrl: string;
  description: string;
  category: string;
};

export type UpdateExerciseVideoParams = {
  name: string;
  videoUrl: string;
  description: string;
  category: string;
};
