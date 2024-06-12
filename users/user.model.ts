import { Schema, InferSchemaType, model } from "mongoose";


export const GUEST_PICTURE = {
    originalname: "guest.png",
    mimetype: "image/png",
    path: "images/guest.png",
    size: 150
};

const UserSchema = new Schema({
    fullname: { first: String, last: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    picture: {
        type: {
            originalname: String,
            mimetype: String,
            path: String,
            size: Number
        }, default: GUEST_PICTURE
    }
}, { timestamps: true, versionKey: false });

export type User = InferSchemaType<typeof UserSchema>;

export const UserModel = model<User>('user', UserSchema);

//post is receiving email,old password and new password, compare old with the one in the db and persist the new one instead 



// export const post_newpassword: RequestHandler<unknown, StandardResponse<number>, { email: string, oldPassword: string, newPassword: string; }, unknown> = async (req, res, next) => {
//     const { email, oldPassword, newPassword } = req.body;
//     //
//     const results = await UserModel.findOne({ email: email }, { password: 1, _id: 0 });
//     const compare = bcrypt.compare(oldPassword, results?.password);
//       if(compare) {
//      const newpasshashed= bcrypt.hash(newPassword,saltround)
//     const newrsults = await UserModel.updateOne({ email: email }, { $set: { password: newpasshashed } });
//     res.json({ success: true, data: newrsults.modifiedCount });
// }

// }