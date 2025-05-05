"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
class ErrorService {
    asyncHandler(fn) {
        return (req, res, next) => {
            fn(req, res, next).catch((error) => {
                return next(error);
            });
        };
    }
    globalErrorHandler(error, req, res, next) {
        return res.status((error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({ success: false, message: error.message, stack: error.stack });
    }
}
exports.ErrorService = ErrorService;
exports.default = new ErrorService();
