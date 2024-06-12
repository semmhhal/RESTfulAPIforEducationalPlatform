import { RequestHandler } from "express";
import { StandardResponse } from "../Generaltypes/response";
import { User, UserModel, GUEST_PICTURE } from '../users/user.model';




export const post_picture: RequestHandler<{ user_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
    try {

        const { user_id } = req.params;
        const upload_new = req.file;

        if (user_id !== req.userInfo.userId) throw new Error('User not match)');

        const result = await UserModel.updateOne({ _id: user_id }, { $set: { picture: upload_new } }); //property set used for object, push for array
        res.json({ success: true, data: result.modifiedCount });

    }
    catch (error) {
        next(error);
    }
};

export const delete_picture: RequestHandler<{ user_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        if (user_id !== req.userInfo.userId) throw new Error('User not match)');
        const results = await UserModel.updateOne({ _id: user_id }, { $set: { picture: GUEST_PICTURE } });
        res.json({ success: true, data: results.modifiedCount });
    }
    catch (error) {
        next(error);
    }
};

export const deactivate_user: RequestHandler<{ user_id: string; }, StandardResponse<number>, User, { action: string; }> = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const { action } = req.query;

        if (user_id !== req.userInfo.userId) throw new Error('User not match)');
        if (!action) throw new Error("failed to locate to path");

        const results = await UserModel.updateOne({ _id: user_id }, { $set: { active: false } });
        res.json({ success: true, data: results.modifiedCount });
    }
    catch (error) {
        next(error);
    }
};