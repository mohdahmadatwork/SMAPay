import { Router,Request,Response } from "express";
import authenticateUser from "../middleware/authenticate";
import { Account } from "../models/Account";
import ResponseStatus from "../utils/ResponseStatus";
import mongoose from "mongoose";
const accountRouter = Router();
accountRouter.get("/balance",authenticateUser,async (req:Request,res:Response)=>{
    try {
        const userId = req.userId;
        const accountBalance = await Account.findOne({
            userId:userId
        });
        if (accountBalance) {   
            const balance = ((accountBalance?.accountBalance)/(Math.pow(10,accountBalance?.decimalPLaces))).toFixed(accountBalance?.decimalPLaces);
            res.status(ResponseStatus.success).json({balance:balance});
        }else{
            res.status(ResponseStatus.forbidden).json("You are not authorized!");
        }
    } catch (error) {
        res.status(ResponseStatus.forbidden).json("You are not authorized!");
    }
})
accountRouter.post("/transfer",authenticateUser,async (req:Request,res:Response)=>{
    // try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const data = req.body;

        const senderAccount = await Account.findOne({userId:req.userId}) .session(session);
        if (!senderAccount || senderAccount<data.amount) {
            await session.abortTransaction();
            return res.status(ResponseStatus.badRequest).json({
                message:"Insufficient balance"
            });
        }

        const recieverAccount = await Account.findOne({userId:data.to}).session(session);
        if(!recieverAccount){
            await session.abortTransaction();
            return res.status(ResponseStatus.badRequest).json({
                message:"Insufficient balance"
            });
        }

        data.amount = data.amount*Math.pow(10,recieverAccount.decimalPLaces);
        await Account.updateOne({userId:req.userId},{$inc:{accountBalance:-data.amount}}).session(session);
        await Account.updateOne({userId:data.to},{$inc:{accountBalance:data.amount}}).session(session);
        await session.commitTransaction();
        res.status(ResponseStatus.success).json({
            message:"Transaction successfull"
        });
    // } catch (error) {
        
    // }
})


export default accountRouter;

