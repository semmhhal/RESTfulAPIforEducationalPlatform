import { RequestHandler } from "express";
import { verify } from 'jsonwebtoken';
import { JWTContent } from "./JWTtypes";

export const checkandVerifyToken: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
    try{
    const token = req.headers.authorization?.split(' ')[1];

    if (!(token && process.env.SECRET_KEY)) throw new Error('User not Authorized!');
    const results = verify(token, process.env.SECRET_KEY) as JWTContent;

    if (!results) throw new Error('not Verified!');
    req.userInfo = results;
    next();
    }catch(error){
        next(error)
    }

}

