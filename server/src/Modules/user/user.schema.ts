import joi from "joi";
import { IUser } from "../../Utils/common/types";

export const userUpdateSchema = joi.object<IUser>({
    userName: joi.string(),
    email: joi.string()
});