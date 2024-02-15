import mongoose from "mongoose";

const mongoUri:string = `${process.env.MONGODB_URI}`

export const connectToMongo = async ()=>{
    console.log(mongoUri);
    await mongoose.connect(mongoUri);
    console.log("Connected to db!!!!!!!!!!!!!!!!")
}