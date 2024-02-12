import { Schema,model } from "mongoose";




export interface IUser {
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    password:String,
    createdAt:Date,
    updatedAt:Date
}


const userSchema = new Schema<IUser>({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:false,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        required:false
    },
    updatedAt:{
        type:Date,
        required:true
    }
});



export const User = model<IUser>('User',userSchema);