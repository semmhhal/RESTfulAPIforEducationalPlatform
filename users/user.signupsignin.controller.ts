import { RequestHandler } from "express";
import { StandardResponse } from "../Generaltypes/response";
import { User, UserModel } from "./user.model";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const post_signup: RequestHandler<unknown, StandardResponse<User>, User, unknown> = async (req, res, next) => {
    try {
        const saltRounds = 10;
        const { fullname, email, password } = req.body;
        const hashedpass = await bcrypt.hash(password, saltRounds);
        const results = await UserModel.create({ fullname: fullname, email: email, password: hashedpass });
        res.json({ success: true, data: results });
    }
    catch (error) {
        next(error);
    }
};


export const post_signin: RequestHandler<unknown, StandardResponse<string>, User, unknown> = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const found_user = await UserModel.findOne({ email: email, active: true });

        if (!found_user) throw new Error('User not found!');

        const comparepass = await bcrypt.compare(password, found_user.password);

        if (!(comparepass && process.env.SECRET_KEY)) throw new Error('Sorry no Id for you!');
        const jwt = sign({
            userId: found_user._id,
            fullname: found_user.fullname,
            email: found_user.email,
            profilePicturePath: found_user.picture.path
        }, process.env.SECRET_KEY);
        //creating token using jwt like an id pass to anapurna
        res.json({ success: true, data: jwt }); //add JWT HERE ONWARDS
    }
    catch (error) {
        next(error);
    }
};

