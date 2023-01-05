import { Schema, model } from "mongoose";

interface IUser {
  discordId: string;
  username: string;
  avatar: string;

  joined: Date;
  reJoined?: Array<Date>;
  left?: Date;

  roles: Array<String>;
}

const userSchema = new Schema<IUser>({
  discordId: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, default: null },

  joined: { type: Date, default: new Date() },
  reJoined: { type: Array<Date>, required: false, default: [] },
  left: { type: Date, default: null },

  roles: [{ type: String }],
});

export default model<IUser>("User", userSchema);
