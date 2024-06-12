import { RequestHandler } from "express";
import { StandardResponse } from "../Generaltypes/response";
import { Course, CourseModel } from "./courses.model";

export const post_course: RequestHandler<unknown, unknown, Course, unknown> = async (req, res, next) => {
    try {
        const newcourse = req.body;

        const fullName = `${req.userInfo.fullname.first} ${req.userInfo.fullname.last}`;
        newcourse.created_by = {
            user_id: req.userInfo.userId,
            fullname: fullName,
            email: req.userInfo.email
        };
        const addcourse = await CourseModel.create(newcourse);

        res.json({ success: true, data: addcourse });

    }
    catch (error) {
        next(error);
    }
};

export const get_allowncourses: RequestHandler<unknown, StandardResponse<any>, unknown, { action: string; }> = async (req, res, next) => {
    try {
        const page_size = 2;
        const page = 1;
        const { action } = req.query;
        let query = {};

        if (action === "own") query = { "created_by.user_id": req.userInfo.userId };

        const results = await CourseModel.find(query)
            .limit(page_size)
            .skip((page - 1) * page_size);
        res.json({ success: true, data: results });
    }

    catch (error) {
        next(error);
    };
};

export const get_course: RequestHandler<{ course_id: string; }, StandardResponse<Course | {}>, unknown, unknown> = async (req, res, next) => {
    try {
        //find by course id
        const { course_id } = req.params;
        const results = await CourseModel.find({ _id: course_id });
        res.json({ success: true, data: results ? results : {} });
    }
    catch (error) {
        next(error);
    }
};

export const put_course: RequestHandler<{ course_id: string; }, StandardResponse<Course | {}>, Course, unknown> = async (req, res, next) => {

    try {
        //only the owner can update and delete, make sure to use the ""created_by.user_id":req.userInfo.userId" and course id in your query
        const { course_id } = req.params;
        const { title, description } = req.body;
        const results = await CourseModel.updateOne({ "created_by.user_id": req.userInfo.userId, _id: course_id }, { $set: { title: title, description: description } });
        res.json({ success: true, data: results ? results : {} });
    }
    catch (error) {
        next(error);
    }
};

export const delete_course: RequestHandler<{ course_id: string; }, StandardResponse<number>, unknown, unknown> = async (req, res, next) => {

    try {
        const { course_id } = req.params;
        //only the owner can update and delete, make sure to use the ""created_by.user_id":req.userInfo.userId" and course id in your query
        const results = await CourseModel.deleteOne({ "created_by.user_id": req.userInfo.userId, _id: course_id });
        res.json({ success: true, data: results.deletedCount });
    }
    catch (error) {
        next(error);
    }
}

