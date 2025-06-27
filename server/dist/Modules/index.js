"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.ratingController = exports.dropController = exports.authController = void 0;
var auth_controller_1 = require("./auth/auth.controller");
Object.defineProperty(exports, "authController", { enumerable: true, get: function () { return __importDefault(auth_controller_1).default; } });
var drop_controller_1 = require("./drop/drop.controller");
Object.defineProperty(exports, "dropController", { enumerable: true, get: function () { return __importDefault(drop_controller_1).default; } });
var rating_controller_1 = require("./rating/rating.controller");
Object.defineProperty(exports, "ratingController", { enumerable: true, get: function () { return __importDefault(rating_controller_1).default; } });
var user_controller_1 = require("./user/user.controller");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return __importDefault(user_controller_1).default; } });
