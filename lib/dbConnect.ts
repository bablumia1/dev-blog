import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(URI as string);
    console.log(`DB connected successFully`);
  } catch (error: any) {
    console.log(error.message);
  }
};

export default dbConnect;
