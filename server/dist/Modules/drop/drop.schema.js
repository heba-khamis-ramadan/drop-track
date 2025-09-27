"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.dropSchema = joi_1.default.object({
    dropName: joi_1.default.string().required().max(100),
    tag: joi_1.default.string().optional().max(50),
    address: joi_1.default.string().optional().max(300),
    location: joi_1.default.object({
        type: joi_1.default.string().valid("Point").required(),
        coordinates: joi_1.default.array()
            .items(joi_1.default.number())
            .length(2) // [lng, lat]
            .required()
    }).required(),
    imageUrls: joi_1.default.array().items(joi_1.default.object({
        secure_url: joi_1.default.string().uri().required(),
        public_id: joi_1.default.string().required()
    })).required()
});
