import { Schema, model } from "mongoose";
import { IUser } from "../../Utils/common/types";

// schema 
const userSchema = new Schema<IUser>({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pinnedDrops: [{type: Schema.Types.ObjectId, ref: "Drop"}]
}, 
{timestamps: true});

// model
const User = model<IUser>("User", userSchema);

export default User;