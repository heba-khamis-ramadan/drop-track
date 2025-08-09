"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerHandler = void 0;
const express_1 = require("express");
const db_connection_1 = require("./DB/db.connection");
const error_1 = __importDefault(require("./Utils/error"));
const controllers = __importStar(require("./Modules"));
const controllerHandler = (app) => {
    // parse data from json
    app.use((0, express_1.json)());
    // connect to db
    (0, db_connection_1.connectDB)();
    const cors = require('cors');
    app.use(cors());
    // import controllers
    app.use("/auth", controllers.authController);
    app.use("/drops", controllers.dropController);
    app.use("/ratings", controllers.ratingController);
    app.use("/users", controllers.userController);
    // handle invalid req
    app.all(/.*/, (req, res, next) => {
        res.status(404).json({ message: "invalid url :(" });
    });
    //=== global error handler ===//
    app.use(error_1.default.globalErrorHandler);
};
exports.controllerHandler = controllerHandler;
