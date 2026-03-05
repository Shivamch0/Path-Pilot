import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

const connectDB = async (req , res) => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log("Database is connected successfully... " , connection.connection.host)
    } catch (error) {
        console.log(error)
    }
}

export { connectDB }