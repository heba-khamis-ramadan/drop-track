import { Schema, model } from "mongoose";
import { IUser } from "../../Utils/common/types";

// schema 
const userSchema = new Schema<IUser>({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isDeleted: {type: Boolean, default: false},
    isLoggedout: {type: Boolean, default: false},
    deletedAt: {type: Date},
    LoggedoutAt: {type: Date},
    pinnedDrops: [{type: Schema.Types.ObjectId, ref: "Drop"}]
}, 
{timestamps: true});

// model
const User = model<IUser>("User", userSchema);

export default User;