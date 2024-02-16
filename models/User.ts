import { Schema, model, models } from "mongoose";

export interface UserModelSchema {
  name: string;
  email: string;
  role: "user" | "admin";
  provider: "github";
  avatar?: string;
}

const userSchema = new Schema<UserModelSchema>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    provider: {
      type: String,
      enum: ["github"],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", userSchema);

export default User;
