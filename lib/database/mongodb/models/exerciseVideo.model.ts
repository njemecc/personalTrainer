import { Schema, model, models } from "mongoose";

const ExerciseVideoSchema = new Schema({
  name: { type: String },
  videoUrl: { type: String },
  description: { type: String },
  category: { type: String },
});

const ExerciseVideo =
  models.ExerciseVideo || model("ExerciseVideo", ExerciseVideoSchema);

export default ExerciseVideo;
