import { model, Schema, models } from "mongoose";

// Define the nutrition plan schema for user
const UserNutritionPlanSchema = new Schema({
  planId: { 
    type: Schema.Types.ObjectId, 
    ref: 'NutritionPlan', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  assignedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { _id: false }); // Prevent Mongoose from creating an _id for subdocuments

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
  username: { 
    type: String, 
    unique: true,
    sparse: true // Omogućava null vrednosti da ne krše unique constraint
  },
  created_at: { type: Date },
  first_name: { type: String },
  last_name: { type: String },
  is_active: { type: Boolean, default: false },
  // Add nutrition plans field to user schema
  nutritionPlans: {
    type: [UserNutritionPlanSchema],
    default: []
  }
});

const User = models.User || model("User", UserSchema);

export default User;
