import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: [true, "Field is required"] },
    email: { type: String, required: [true, "Field is required"], match: /.+\@.+\..+/, unique: true },
    password: { type: String, required: [true, "Field is required"] },
  }, // Customizing the versionKey
  { versionKey: "customVersionKey" }
);

// User Model
export const User = model<IUser>("User", UserSchema);
