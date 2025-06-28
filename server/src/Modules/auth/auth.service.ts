import { NextFunction, Response } from "express";
import { IAuthRequest, IUser } from "../../Utils/common/types";
import { SignUpDto, LogInDto } from "./auth.dto";
import { DBService } from "../../DB/db.service";
import User from "../../DB/Models/user.model";
import { AppError } from "../../Utils/error";
import { compareSync, hashSync } from "bcrypt";
import tokenService from "./../../Utils/token"

class AuthService {
  private _userModel = new DBService<IUser>(User);
  signup = async (req: IAuthRequest, res: Response, next: NextFunction) : Promise<Response | NextFunction> => {
    const { userName, email, password }: SignUpDto = req.body;
    // check if user already exists
    const user = await this._userModel.findOne({ email });
    if (user) return next(new AppError("User already exists", 409)) as unknown as NextFunction;
    // hash the password
    const hashedPassword = hashSync(password, 10);
    // create new user
    const createdUser = await this._userModel.create({
      userName,
      email,
      password: hashedPassword
    });
    return res.status(201).json({ success: true, message: "user created successfully", data: createdUser });
  }

  login = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const { email, password }: LogInDto = req.body;
    // check user existance
    const user = await this._userModel.findOne({ email });
    if(!user) return next(new AppError("user not found", 404));
    // check password
    if(!compareSync(password, user.password)) return next(new AppError("incorrect password", 401));
    // change loggedout back to true
    const id = user.id;
    if(user.isLoggedout || user.isDeleted) {
        await this._userModel.findByIdAndUpdate(id, {isLoggedout: false, isDeleted: false});
    };
    // generate token
    const token = tokenService.sign({_id: user._id}, process.env.JWT_KEY as string, {expiresIn: "6h"});
    return res.status(200).json({ success: true, message: "login successfully", token});
  }

  logout = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    // get user data from req
    const user_id = req.authUser.id;
    // check if user is deleted or logged out user existance
    const existingUser = await this._userModel.findById(user_id);
    if(existingUser?.isDeleted || existingUser?.isLoggedout) return next(new AppError("user not found", 404));
    await this._userModel.findByIdAndUpdate(user_id, {isLoggedout: true, isDeleted: true, LoggedoutAt: Date.now()});
    // send response
    return res.status(200).json({success: true, message: "logout successfully"});
  }
}

export default new AuthService();
