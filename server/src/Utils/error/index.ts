import { NextFunction, Response } from "express";
import { IAuthRequest } from "../common/types";

export class AppError extends Error {
    constructor(message: string, public statusCode: number = 500) {
        super(message);
    }
}

export class ErrorService {
    asyncHandler(fn: Function) {
        return (req: IAuthRequest, res: Response, next: NextFunction) => {
            fn(req, res, next).catch((error: Error) => {
                return next(error);
            });
        }
    }

    globalErrorHandler (error: AppError, req: IAuthRequest, res: Response, next: NextFunction): Response {
        return res.status(error?.statusCode || 500).json({success: false ,message: error.message, stack: error.stack})
    }
}

export default new ErrorService();