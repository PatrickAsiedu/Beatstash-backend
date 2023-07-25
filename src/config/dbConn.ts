import mongoose from "mongoose";
// import dotenv from "dotenv"
// dotenv.config()

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    if (process.env.DB_URL !== undefined) {
      await mongoose.connect(process.env.DB_URL);
    } else {
      console.error("db url is undefined");
    }
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
