"use server";
import mongoose from "mongoose";

const connectdb = async() => {
    try {
        if(mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI!);
            console.log("db connectedd");
        }
    } catch(error) {
        console.log(error);
    }
};

export default connectdb;
