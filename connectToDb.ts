const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();
const mongodbUri = process.env.MONGODB_URI as string;

export const connectToDb = async () => {
  try {
    await mongoose.connect(mongodbUri);
    console.log(mongodbUri, "connected");
  } catch (error) {
    console.error(error, "cant connect");
  }
};

connectToDb();
