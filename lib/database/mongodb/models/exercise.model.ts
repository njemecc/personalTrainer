import { model, Schema, models } from "mongoose";

const ExerciseSchema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
});

const Exercise = models.Exercise || model("Exercise", ExerciseSchema);

export default Exercise;
