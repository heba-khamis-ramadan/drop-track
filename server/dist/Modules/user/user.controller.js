"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../Middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../../Middlewares/validation.middleware"));
const error_1 = __importDefault(require("../../Utils/error"));
const user_service_1 = __importDefault(require("./user.service"));
const user_schema_1 = require("./user.schema");
const authController = (0, express_1.Router)();
authController.get("/get-user", error_1.default.asyncHandler(auth_middleware_1.default.authentication), error_1.default.asyncHandler(user_service_1.default.get_user));
authController.put("/update-user", error_1.default.asyncHandler(auth_middleware_1.default.authentication), validation_middleware_1.default.isValid(user_schema_1.userUpdateSchema), error_1.default.asyncHandler(user_service_1.default.update_user));
authController.delete("/delete-user", error_1.default.asyncHandler(auth_middleware_1.default.authentication), error_1.default.asyncHandler(user_service_1.default.delete_user));
exports.default = authController;
