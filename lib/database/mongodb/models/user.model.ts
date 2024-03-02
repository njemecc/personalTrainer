import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
  username: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
