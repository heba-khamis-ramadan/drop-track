"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = require("../../DB/db.service");
const drop_model_1 = __importDefault(require("../../DB/Models/drop.model"));
const error_1 = require("../../Utils/error");
const mongoose_1 = require("mongoose");
class DropService {
    constructor() {
        this._dropModel = new db_service_1.DBService(drop_model_1.default);
        this.create_drop = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user_id = req.authUser.id;
            const { dropName, tag, location, imageUrls } = req.body;
            // create new drop
            const drop = yield this._dropModel.create({
                dropName,
                tag,
                location,
                imageUrls,
                addedBy: user_id
            });
            return res.status(201).json({ success: true, message: "drop created successfully", data: drop });
        });
        this.get_drop = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { dropId } = req.params;
            const newDropId = new mongoose_1.Types.ObjectId(dropId);
            const drop = yield this._dropModel.findById(newDropId);
            if (!drop)
                return next(new error_1.AppError("drop not found", 404));
            return res.status(200).json({ success: true, data: drop });
        });
        this.get_drops = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const drops = yield this._dropModel.find();
            if (!drops)
                return next(new error_1.AppError("drops not found", 404));
            return res.status(200).json({ success: true, data: drops });
        });
    }
}
exports.default = new DropService();
