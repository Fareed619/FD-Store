import mongoose from "mongoose";
import "dotenv/config";

const { MONGO_URI } = process.env;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected To DB 👍");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToDB;
