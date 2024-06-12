import { Schema, InferSchemaType, model } from "mongoose";

export const PictureSchema = new Schema({
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true }
}, { timestamps: true });


export type Pictures = InferSchemaType<typeof PictureSchema>;