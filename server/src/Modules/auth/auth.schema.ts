import joi from "joi";
import { IUser } from "../../Utils/common/types";

export const signupSchema = joi.object<IUser>({
    userName: joi.string(),
    email: joi.string(),
    password: joi.string()
});