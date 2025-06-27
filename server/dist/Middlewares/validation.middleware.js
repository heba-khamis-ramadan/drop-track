"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddlewareService = void 0;
const error_1 = require("../Utils/error");
class ValidationMiddlewareService {
    isValid(schema) {
        return (req, res, next) => {
            const data = Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query);
            const result = schema.validate(data, { abortEarly: false });
            if (result.error) {
                const errMesgs = result.error.details.map((err) => err.message).join(", ");
                return next(new error_1.AppError(errMesgs, 400));
            }
            return next();
        };
    }
}
exports.ValidationMiddlewareService = ValidationMiddlewareService;
exports.default = new ValidationMiddlewareService();
