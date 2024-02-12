import {Router,Request,Response,NextFunction} from "express";
import { IUser, User } from "../models/User";
import ResponseStatus from "../utils/ResponseStatus";
import jsonwebtoken from "jsonwebtoken";
import {JWT_SECRET} from "../../config"
import zod from "zod";
import authenticateUser from "../middleware/authenticate";
import { Account } from "../models/Account";
const userRouter = Router();

const signUpBody =zod.object({
    username:zod.string(),
    email:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string(),
    createdAt:zod.date(),
    updatedAt:zod.date()
});
const signinBody = zod.object({
    username_email: zod.string(),
	password: zod.string()
});
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
userRouter.post("/signup",async (req:Request,res:Response)=>{
    try {
        const data = req.body;
        data["createdAt"] = new Date;
        data["updatedAt"] = new Date;
        const {success} = signUpBody.safeParse(data);
        if (!success) {
            return res.status(ResponseStatus.invalidInputs).json({
                message:"Invalid inputs"
            })
        }
        const existingUser = await User.findOne({
            username: data.username
        });
        if (existingUser) {
            return res.status(ResponseStatus.conflict).json({
                message:"Username already exist"
            });
        }
        const existingUser2 = await User.findOne({
            username: data.email
        });
        if (existingUser2) {
            return res.status(ResponseStatus.conflict).json({
                message:"Email already exist"
            });
        }
        const user = await User.create(data);
        const account = await Account.create({
            userId:user._id,
            accountBalance: 1 + Math.random()*1000000,
            decimalPLaces:2
        });
        const token = jsonwebtoken.sign({user:user._id},JWT_SECRET);   
        return res.status(ResponseStatus.success).json({
            message:"User created successfully!!!!!!!!!",
            token:token,
            user:{
                firstname:user.firstname,
                lastname:user.lastname,
                username:user.username,
                email:user.email,
                balance:(account.accountBalance/Math.pow(10,account.decimalPLaces)).toFixed(account.decimalPLaces)
            }
        });
    } catch (error) {
            return res.status(ResponseStatus.error).json({
                messsage:"Server error",
                error:error
            });
    }
});
userRouter.post("/signin",async (req:Request,res:Response)=>{
    try {
        const data = req.body;
        console.log("data",data);
        const {success} = signinBody.safeParse(data);
        if (!success) {
            return res.status(ResponseStatus.invalidInputs).json({
                message: "Incorrect inputs"
            })
        }
        const user = await User.find({
            $or:[
                {username: data.username_email},
                {email:data.username_email}
            ],
            password: data.password
        });

        if (!user) {
            res.status(ResponseStatus.notFound).json({
                message:"Username or Password not matched"
            });
        }else{
            const token = jsonwebtoken.sign({user:user[0]._id},JWT_SECRET);
            const account = await Account.find({
                userId:user[0]._id
            })
            res.status(ResponseStatus.success).json({
                message:"Successfully login",
                token:token,
                user:{
                    firstname:user[0].firstname,
                    lastname:user[0].lastname,
                    username:user[0].username,
                    email:user[0].email,
                    balance:(account[0].accountBalance/Math.pow(10,account[0].decimalPLaces)).toFixed(account[0].decimalPLaces)
                }
            });
        }

    } catch (error) {
        res.status(ResponseStatus.error).json({
            messsage:"Server error",
            error:error
        });
    }
});
userRouter.put("/updateuser",authenticateUser,async (req:Request,res:Response)=>{
    try {
        const data = req.body;
        const {success} = updateBody.safeParse(data);
        if(!success){
            return res.status(ResponseStatus.invalidInputs).json({
                message:"Invalid inputs"
            });
        }
        const isUpdated = await User.updateOne({
            _id:req.userId
        },data)
        if(isUpdated.modifiedCount == 1){
            return res.status(ResponseStatus.success).json({
                message:"successfully updated"
            });
        }else{
            return res.status(ResponseStatus.success).json({
                message:"Unable to update"
            });
        }
    } catch (error) {
        res.status(ResponseStatus.error).json({
            message:"Server error"
        });
    }
})
userRouter.get("/bulk",authenticateUser,async (req:Request,res:Response)=>{
    // try {
        const filter = req.query.filter as string | undefined;
        if (!filter) {
            const users = await User.find({});
            if (users) {
                res.status(ResponseStatus.success).json({
                    message:"Search results",
                    users:users
                    .filter(user => user._id != req.userId) // Filter out the user with the specified ID
                    .map(user => ({
                      username: user.username,
                      firstname: user.firstname,
                      lastname: user.lastname,
                      _id: user._id
                    }))
                });
            }else{
                res.status(ResponseStatus.notFound).json({
                    message:"No user found"
                });
            }
        }else{
            const users = await User.find({
                $or:[{firstname:{"$regex": filter}},{lastname:{"$regex": filter}},{username:{"$regex": filter}}]
            });
            if (users) {
                res.status(ResponseStatus.success).json({
                    message:"Search results",
                    users:users.map(user => ({
                        username:user.username,
                        firstname:user.firstname,
                        lastname:user.lastname,
                        _id:user._id
                    }))
                });
            }else{
                res.status(ResponseStatus.notFound).json({
                    message:"No user found"
                });
            }
        }
    // } catch (error) {
        
    // }
})
userRouter.get('/checkLogin',authenticateUser,async (req:Request,res:Response)=>{
    try {
        const user = await User.find({
            _id:req.userId
        });
        const account = await Account.find({
            userId:user[0]._id
        });
        const currentUser = {
            firstname:user[0].firstname,
            lastname:user[0].lastname,
            username:user[0].username,
            email: user[0].email,
            balance:(account[0].accountBalance/Math.pow(10,account[0].decimalPLaces)).toFixed(account[0].decimalPLaces)            
        }
        if (user) {   
            return res.status(ResponseStatus.success).json({message:"",isLogin:true,user:currentUser});
        }else{
            return res.status(ResponseStatus.notFound).json({message:"",isLogin:false,user:""});
        }
    } catch (error) {
        return res.status(ResponseStatus.notFound).json(error);
    }
})






export default userRouter;


