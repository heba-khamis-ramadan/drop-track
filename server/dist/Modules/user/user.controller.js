"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = (0, express_1.Router)();
userController.get("/profile", (req, res) => {
    // Handle fetching user profile
    res.status(200).send("User profile data");
});
exports.default = userController;
