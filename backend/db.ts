import mongoose from "mongoose";

const mongoUri:string = "mongodb://localhost:27017/paytm"


export const connectToMongo = async ()=>{
    await mongoose.connect(mongoUri);
    console.log("Connected to db!!!!!!!!!!!!!!!!")
}