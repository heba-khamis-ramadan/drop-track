"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// schema 
const rateSchema = new mongoose_1.Schema({
    rateUser: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    ratedDrop: { type: mongoose_1.Schema.Types.ObjectId, ref: "Drop" },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });
// model
const Rate = (0, mongoose_1.model)("Rate", rateSchema);
exports.default = Rate;
