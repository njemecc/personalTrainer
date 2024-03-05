import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
  username: { type: String, unique: true },
  created_at: { type: Date },
  first_name: { type: String },
  last_name: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
