import mongoose from "mongoose";

const MONGODB_URI = import.meta.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffering if not needed
      dbName: "astroBlog", // Specify DB Name here if not in URI
    };

    console.log("Creating new database connection promise");
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Database connection established");
        return mongoose;
      })
      .catch((error) => {
        console.error("Database connection error:", error);
        cached.promise = null; // Reset promise on error
        throw error; // Rethrow error for handling upstream
      });
  }

  try {
    console.log("Awaiting database connection promise");
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, ensure promise is nullified so retry can happen
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
