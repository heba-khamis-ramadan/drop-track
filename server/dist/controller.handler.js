"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerHandler = void 0;
const express_1 = require("express");
const connection_1 = require("./DB/connection");
const controllerHandler = (app) => {
    // parse data from json
    app.use((0, express_1.json)());
    // connect to db
    (0, connection_1.connectDB)();
    // handle invalid req
    app.all("*", (req, res, next) => {
        res.status(404).json({ message: "invalid url :(" });
    });
    //=== global error handler ===//
};
exports.controllerHandler = controllerHandler;
