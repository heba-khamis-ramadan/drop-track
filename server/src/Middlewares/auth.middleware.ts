import { NextFunction, Request, Response } from "express";
import tokenService from "../Utils/token";
import { DBService } from "../DB/db.service";
import { IAuthRequest, IUser } from "../Utils/common/types";
import User from "../DB/Models/user.model";
import { AppError } from "../Utils/error";

class AuthMiddlewareService {
    private _userModel = new DBService<IUser>(User)
    async authentication(req: IAuthRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    // access token
    if (!authorization?.startsWith("access")) {
        return next(new AppError("invalid bearer token", 401));
    }
    const token = authorization.split(" ")[1];

    // verify token
    const payload = tokenService.verify(token, process.env.JWT_KEY as string);
    const authUser = await this._userModel.findById(payload._id);
    if(!authUser) {
        return next (new AppError("user not found", 404));
    }

    // add user to request
    req.authUser = authUser;
   }

//    authorization(roles: string[]) {
//     return (req: IAuthRequest, res: Response, next: NextFunction) => {
//         if(!roles.includes(req.authUser.role)) {
//             return next(new AppError("not authorized", 401));
//         }
//         return next();
//     };
//    }
 }

 export default new AuthMiddlewareService();