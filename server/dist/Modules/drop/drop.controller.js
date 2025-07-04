"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../Middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../../Middlewares/validation.middleware"));
const error_1 = __importDefault(require("../../Utils/error"));
const drop_service_1 = __importDefault(require("./drop.service"));
const drop_schema_1 = require("./drop.schema");
const dropController = (0, express_1.Router)();
dropController.post("/create", error_1.default.asyncHandler(auth_middleware_1.default.authentication), validation_middleware_1.default.isValid(drop_schema_1.dropSchema), error_1.default.asyncHandler(drop_service_1.default.create_drop));
dropController.get("/:dropId", error_1.default.asyncHandler(drop_service_1.default.get_drop));
dropController.get("/", error_1.default.asyncHandler(drop_service_1.default.get_drops));
exports.default = dropController;
