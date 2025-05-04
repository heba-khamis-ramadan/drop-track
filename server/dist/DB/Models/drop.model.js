"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// schema 
const dropSchema = new mongoose_1.Schema({
    dropName: { type: String, required: true },
    tag: { type: String },
    ratings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Rate" }],
    location: {
        type: {
            type: String,
            enum: ['Point'], // must be 'Point' for GeoJSON
            required: true
        },
        coordinates: {
            type: [Number], // array of numbers [lng, lat]
            required: true
        }
    },
    imageUrls: [{ type: { secure_url: { type: String }, public_id: { type: String } } }],
    addBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
// model
const Drop = (0, mongoose_1.model)("Drop", dropSchema);
exports.default = Drop;
