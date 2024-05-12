import mongoose from "mongoose";

async function db() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    throw new Error("Connection failed!");
  }
}

export default db;
