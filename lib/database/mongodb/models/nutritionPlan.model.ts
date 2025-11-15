import { Schema, model, models, Document } from "mongoose";

export interface INutritionPlan extends Document {
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const NutritionPlanSchema = new Schema<INutritionPlan>(
  {
    name: {
      type: String,
      required: [true, "Naziv plana ishrane je obavezan"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL dokumenta je obavezan"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const NutritionPlan = models.NutritionPlan || model<INutritionPlan>("NutritionPlan", NutritionPlanSchema);

export default NutritionPlan;
