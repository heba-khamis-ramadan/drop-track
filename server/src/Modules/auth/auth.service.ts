import { NextFunction, Response } from "express";
import { IAuthRequest, IUser } from "../../Utils/common/types";
import { SignUpDto } from "./auth.dto";
import { DBService } from "../../DB/db.service";
import User from "../../DB/Models/user.model";
import { AppError } from "../../Utils/error";
import { hashSync } from "bcrypt";

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
    return res.status(201).json({ success: true, message: "User created successfully", data: createdUser });
  }

  login = (req: IAuthRequest, res: Response, next: NextFunction) => {
    // Handle login logic
  }
}

export default new AuthService();
