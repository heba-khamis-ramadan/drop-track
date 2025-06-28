import { NextFunction, Response } from "express";
import { IAuthRequest, IUser } from "../../Utils/common/types";
import { DBService } from "../../DB/db.service";
import User from "../../DB/Models/user.model";
import { AppError } from "../../Utils/error";
import { compareSync, hashSync } from "bcrypt";
import tokenService from "./../../Utils/token"

class UserService {
  private _userModel = new DBService<IUser>(User);

    get_user = async (req: IAuthRequest, res: Response, next: NextFunction) => {
        const user_id = req.authUser.id;
        // check if user is deleted or logged out user existance
        const user = await this._userModel.findById(user_id);
        if(user?.isDeleted || user?.isLoggedout) return next(new AppError("user not found", 404));
        return res.status(200).json({success: true, data: req.authUser});
    }

    update_user = async (req: IAuthRequest, res: Response, next: NextFunction) => {
        const user_id = req.authUser.id;
        // check if user is deleted or logged out user existance
        const existingUser = await this._userModel.findById(user_id);
        if(existingUser?.isDeleted || existingUser?.isLoggedout) return next(new AppError("user not found", 404));
        const {userName, email} = req.body;
        const updatedUser = await this._userModel.findByIdAndUpdate(user_id, {userName, email}, {new: true});
        return res.status(200).json({success: true, data: updatedUser});
    }

    delete_user = async (req: IAuthRequest, res: Response, next: NextFunction) => {
        const user_id = req.authUser.id;
        // check if user is deleted or logged out user existance
        const existingUser = await this._userModel.findById(user_id);
        if(existingUser?.isDeleted || existingUser?.isLoggedout) return next(new AppError("user not found", 404));
        await this._userModel.findByIdAndUpdate(user_id, {isDeleted: true});
        return res.status(200).json({success: true, message: "user deleted successfully"});
    }
  }

  export default new UserService();