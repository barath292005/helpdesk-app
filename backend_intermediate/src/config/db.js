import mongoose from "mongoose";

const connectDB = async (uri) => {
  await mongoose.connect(uri);
  console.log("MongoDB Connected");
};

export default connectDB;
