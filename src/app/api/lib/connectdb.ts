import mongoose from "mongoose";

export async function connectDB() {
  try { 
    return await mongoose.connect(process.env.MONGO_URL! || "");
  } catch (error) {
    console.log(error);
    throw error;
  }
}