import { Schema, InferSchemaType } from "mongoose";
export const LectureSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true }
});

export type Lecture = InferSchemaType<typeof LectureSchema>;