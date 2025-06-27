"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratingController = (0, express_1.Router)();
ratingController.post("/create", (req, res) => {
    // Handle rating creation
    res.status(201).send("Rating created");
});
exports.default = ratingController;
