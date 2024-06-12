import mongoose from "mongoose";

export function connect_DB(){
    if (process.env.MONGO_DB)
        mongoose.connect(process.env.MONGO_DB)
            .then(() => console.log('connected to DB sucessfully'))
            .catch(() => console.log('could not connect to DB'));
}