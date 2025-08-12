import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    const dbURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongoDB;
