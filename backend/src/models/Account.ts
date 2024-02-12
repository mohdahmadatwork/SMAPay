import {ObjectId, Schema, model} from "mongoose";
import { User } from "./User";


interface IAccount {
    userId : ObjectId,
    accountBalance:number,
    decimalPLaces:number
}


const accountSchema = new Schema<IAccount>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    accountBalance:{
   
        type:Number,
        required:true,
    },
    decimalPLaces:{
        type:Number,
        default:2
    }
});


export const Account = model<IAccount>('Account',accountSchema);


