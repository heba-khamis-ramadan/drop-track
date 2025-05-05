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
const token_1 = __importDefault(require("../Utils/token"));
const db_service_1 = require("../DB/db.service");
const user_model_1 = __importDefault(require("../DB/Models/user.model"));
const error_1 = require("../Utils/error");
class AuthMiddlewareService {
    constructor() {
        this._userModel = new db_service_1.DBService(user_model_1.default);
        //    authorization(roles: string[]) {
        //     return (req: IAuthRequest, res: Response, next: NextFunction) => {
        //         if(!roles.includes(req.authUser.role)) {
        //             return next(new AppError("not authorized", 401));
        //         }
        //         return next();
        //     };
        //    }
    }
    authentication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            // access token
            if (!(authorization === null || authorization === void 0 ? void 0 : authorization.startsWith("access"))) {
                return next(new error_1.AppError("invalid bearer token", 401));
            }
            const token = authorization.split(" ")[1];
            // verify token
            const payload = token_1.default.verify(token, process.env.JWT_KEY);
            const authUser = yield this._userModel.findById(payload._id);
            if (!authUser) {
                return next(new error_1.AppError("user not found", 404));
            }
            // add user to request
            req.authUser = authUser;
        });
    }
}
exports.default = new AuthMiddlewareService();
