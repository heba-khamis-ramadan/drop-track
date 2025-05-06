"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerHandler = void 0;
const express_1 = require("express");
const db_connection_1 = require("./DB/db.connection");
const error_1 = __importDefault(require("./Utils/error"));
const controllerHandler = (app) => {
    // parse data from json
    app.use((0, express_1.json)());
    // connect to db
    (0, db_connection_1.connectDB)();
    // handle invalid req
    app.all(/.*/, (req, res, next) => {
        res.status(404).json({ message: "invalid url :(" });
    });
    //=== global error handler ===//
    app.use(error_1.default.globalErrorHandler);
};
exports.controllerHandler = controllerHandler;
