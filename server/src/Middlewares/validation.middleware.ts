import { NextFunction, Response } from "express";
import { IAuthRequest } from "../Utils/common/types";
import { ObjectSchema } from "joi"
import { AppError } from "../Utils/error";

class ValidationMiddlewareService {
    isValid(schema: ObjectSchema) {
        return (req: IAuthRequest, res: Response, next: NextFunction) => {
            const data = {...req.body, ...req.params, ...req.query};
            const result = schema.validate(data, { abortEarly: false});
            if(result.error) {
                const errMesgs  = result.error.details.map((err) => err.message).join(", ");
                return next(new AppError(errMesgs, 400));
            }
        };
    }
}