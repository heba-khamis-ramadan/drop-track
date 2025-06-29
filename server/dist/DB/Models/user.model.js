"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// schema 
const userSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isLoggedout: { type: Boolean, default: false },
    deletedAt: { type: Date },
    LoggedoutAt: { type: Date },
    pinnedDrops: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Drop" }]
}, { timestamps: true });
// model
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
