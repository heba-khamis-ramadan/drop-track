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
const user_model_1 = __importDefault(require("../../DB/Models/user.model"));
const error_1 = require("../../Utils/error");
class UserService {
    constructor() {
        this._userModel = new db_service_1.DBService(user_model_1.default);
        this.get_user = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user_id = req.authUser.id;
            // check if user is deleted or logged out user existance
            const user = yield this._userModel.findById(user_id);
            if ((user === null || user === void 0 ? void 0 : user.isDeleted) || (user === null || user === void 0 ? void 0 : user.isLoggedout))
                return next(new error_1.AppError("user not found", 404));
            return res.status(200).json({ success: true, data: req.authUser });
        });
        this.update_user = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user_id = req.authUser.id;
            // check if user is deleted or logged out user existance
            const existingUser = yield this._userModel.findById(user_id);
            if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.isDeleted) || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.isLoggedout))
                return next(new error_1.AppError("user not found", 404));
            const { userName, email } = req.body;
            const updatedUser = yield this._userModel.findByIdAndUpdate(user_id, { userName, email }, { new: true });
            return res.status(200).json({ success: true, data: updatedUser });
        });
        this.delete_user = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user_id = req.authUser.id;
            // check if user is deleted or logged out user existance
            const existingUser = yield this._userModel.findById(user_id);
            if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.isDeleted) || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.isLoggedout))
                return next(new error_1.AppError("user not found", 404));
            yield this._userModel.findByIdAndUpdate(user_id, { isDeleted: true });
            return res.status(200).json({ success: true, message: "user deleted successfully" });
        });
    }
}
exports.default = new UserService();
