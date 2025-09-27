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
const bcrypt_1 = require("bcrypt");
const token_1 = __importDefault(require("./../../Utils/token"));
class AuthService {
    constructor() {
        this._userModel = new db_service_1.DBService(user_model_1.default);
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userName, email, password } = req.body;
            // check if user already exists
            const user = yield this._userModel.findOne({ email });
            if (user)
                return next(new error_1.AppError("User already exists", 409));
            // hash the password
            const hashedPassword = (0, bcrypt_1.hashSync)(password, 10);
            // create new user
            const createdUser = yield this._userModel.create({
                userName,
                email,
                password: hashedPassword
            });
            return res.status(201).json({ success: true, message: "user created successfully", data: createdUser });
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // check user existance
            const user = yield this._userModel.findOne({ email });
            if (!user)
                return next(new error_1.AppError("user not found", 404));
            // check password
            if (!(0, bcrypt_1.compareSync)(password, user.password))
                return next(new error_1.AppError("incorrect password", 401));
            // change loggedout back to true
            const id = user.id;
            if (user.isLoggedout || user.isDeleted) {
                yield this._userModel.findByIdAndUpdate(id, { isLoggedout: false, isDeleted: false });
            }
            ;
            // generate token
            const token = token_1.default.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "6h" });
            return res.status(200).json({ success: true, message: "login successfully", token, userName: user.userName });
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // get user data from req
            const user_id = req.authUser.id;
            // check if user is deleted or logged out user existance
            const existingUser = yield this._userModel.findById(user_id);
            if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.isDeleted) || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.isLoggedout))
                return next(new error_1.AppError("user not found", 404));
            yield this._userModel.findByIdAndUpdate(user_id, { isLoggedout: true, isDeleted: true, LoggedoutAt: Date.now() });
            // send response
            return res.status(200).json({ success: true, message: "logout successfully" });
        });
    }
}
exports.default = new AuthService();
