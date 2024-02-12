import { JWT_SECRET } from "../../config";
import jwt, { JwtPayload, decode } from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import ResponseStatus from "../utils/ResponseStatus";

interface DecodedPayload {
    user: string;
}


const authenticateUser = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(ResponseStatus.unAuthorized).json({});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded= jwt.verify(token,JWT_SECRET) as DecodedPayload;
        if (decoded.user) {
            req.userId = decoded.user;
            next();
        }else{
            res.status(ResponseStatus.forbidden).json({
                message:"Not authorized"
            });
        }
    } catch (error) {
        res.status(ResponseStatus.forbidden).json({
            message:"Not authorized"
        });
    }
}


export default authenticateUser;