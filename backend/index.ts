import express,{Application} from "express";
import { connectToMongo } from "./db";
import rootRoute from "./src/routes/index"
import cors from "cors";
import { port } from "./config";
import { ObjectId } from "mongoose";
declare global {
    namespace Express {
        interface Request {
            userId?: any;
        }
    }
}


const app: Application = express();

connectToMongo();
app.use(cors());
app.use(express.json());
app.use("/api/v1",rootRoute);




app.listen(port,()=>{
    console.log(`Backend listening at port ${port}`);
})