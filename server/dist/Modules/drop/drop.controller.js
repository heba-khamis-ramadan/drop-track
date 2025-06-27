"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dropController = (0, express_1.Router)();
dropController.post("/create", (req, res) => {
    // Handle drop creation
    res.status(201).send("Drop created");
});
exports.default = dropController;
