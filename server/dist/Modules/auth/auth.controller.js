"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../Middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../../Middlewares/validation.middleware"));
const error_1 = __importDefault(require("../../Utils/error"));
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_schema_1 = require("./auth.schema");
const authController = (0, express_1.Router)();
authController.post("/signup", validation_middleware_1.default.isValid(auth_schema_1.signupSchema), error_1.default.asyncHandler(auth_service_1.default.signup));
authController.post("/login", error_1.default.asyncHandler(auth_service_1.default.login));
authController.put("/logout", error_1.default.asyncHandler(auth_middleware_1.default.authentication), error_1.default.asyncHandler(auth_service_1.default.logout));
exports.default = authController;
