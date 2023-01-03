import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env || !process.env.DATABASE_URI) throw new Error("Database configuration missing");
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((e) => {
      new Error(e);
    });
}
