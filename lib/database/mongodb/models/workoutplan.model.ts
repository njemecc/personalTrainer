import { model, models, Schema } from "mongoose";

// const WorkoutPlanSchema = new Schema({
//   userId: { type: String, required: true, unique: true },
//   exercises: [
//     {
//       wourkoutPlanId: { type: String, required: true, unique: true },
//       exerciseVideoId: { type: String, required: true, unique: true },
//       sets: { type: Number },
//       reps: { type: Number },
//       weight: { type: Number },
//       day: { type: String },
//       time: { type: String },
//     },
//   ],
// });

const WorkoutPlanSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  days: [
    {
      dayName: { type: String },
      workoutName: { type: String },
      exercises: [
        {
          name: { type: String },
          sets: { type: Number },
          reps: { type: Number },
          url: { type: String },
        },
      ],
    },
  ],
});

const WorkoutPlan =
  models.WorkoutPlan || model("WorkoutPlan", WorkoutPlanSchema);

export default WorkoutPlan;
