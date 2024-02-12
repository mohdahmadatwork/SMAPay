import express,{ Router } from "express";
import userRouter from "./user";
import accountRouter from "./account";
const rootRoute = Router();


rootRoute.use(express.json());

rootRoute.use('/user',userRouter);
rootRoute.use('/account',accountRouter)

export default rootRoute;