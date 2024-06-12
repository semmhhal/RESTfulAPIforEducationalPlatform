import { RequestHandler } from "express";
import { StandardResponse } from "../Generaltypes/response";
import { CourseModel } from "../courses/courses.model";
import { Lecture } from "./lecture.schema";



export const post_lecture: RequestHandler<{ course_id: string; }, StandardResponse<Lecture | {}>, Lecture, unknown> = async (req, res, next) => {
    try {
        const { course_id } = req.params;
        const newlecture = req.body;

        const results = await CourseModel.updateOne({ "created_by.user_id": req.userInfo.userId, _id: course_id }, { $push: { lectures: newlecture } });
        res.json({ success: true, data: results ? results : {} });
    } catch (error) {
        next(error);
    }
};

export const get_lecture: RequestHandler<{ course_id: string; }, StandardResponse<Lecture[] | {}>, unknown, unknown> = async (req, res, next) => {
    try {
        const { course_id } = req.params;

        const results = await CourseModel.find({ _id: course_id }, { lectures: 1 });

        console.log(results);
        res.json({ success: true, data: results ? results : {} });
    }
    catch (error) {
        next(error);
    }

};

export const update_lecture: RequestHandler<{ course_id: string, lecture_id: string; }, StandardResponse<number>, { title: string, description: string, url: string; }, unknown> = async (req, res, next) => {
    try {
        const { course_id, lecture_id } = req.params;
        const { title, description, url } = req.body;
        const results = await CourseModel.updateOne({ _id: course_id, "created_by.user_id": req.userInfo.userId, "lectures._id": lecture_id }, {
            $set: { "lectures.$.title": title, "lectures.$.description": description, "lectures.$.url": url }
        });
        console.log(req.userInfo.fullname);
        res.json({ success: true, data: results.modifiedCount });

    } catch (error) {
        next(error);
    }
};

export const delete_lecture: RequestHandler<{ course_id: string, lecture_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {
    try {
        const { course_id, lecture_id } = req.params;

        const results = await CourseModel.updateOne({ "created_by.user_id": req.userInfo.userId, _id: course_id, "lectures._id": lecture_id }, {
            $pull: {
                lectures: { _id: lecture_id }
            }
        });

        res.json({ success: true, data: results.modifiedCount });
    }

    catch (error) {
        next(error);
    }
};