import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cashed = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  console.log("🔄 Checking database connection...");
  
  if (cashed.conn) {
    console.log("✅ Using cached database connection");
    return cashed.conn;
  }

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing from environment variables");
    throw new Error("MONGODB_URI is missing");
  }
  
  console.log("🔄 Creating new database connection...");
  console.log("📍 Database name: personalTrainer");

  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "personalTrainer",
      bufferCommands: false,
    });

  cashed.conn = await cashed.promise;
  console.log("✅ Database connected successfully");

  return cashed.conn;
};
