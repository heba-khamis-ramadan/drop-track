import { Router } from "express";
import AuthMiddlewareService from "../../Middlewares/auth.middleware";
import ValidationMiddlewareService from "../../Middlewares/validation.middleware";
import ErrorService from "../../Utils/error"
import UserService from "./user.service"

const authController = Router();

authController.get("/get-user", 
  ErrorService.asyncHandler(AuthMiddlewareService.authentication), 
  ErrorService.asyncHandler(UserService.get_user));

authController.put("/update-user", 
  ErrorService.asyncHandler(AuthMiddlewareService.authentication), 
  ErrorService.asyncHandler(UserService.update_user));

authController.delete("/delete-user", 
  ErrorService.asyncHandler(AuthMiddlewareService.authentication), 
  ErrorService.asyncHandler(UserService.delete_user));


export default authController;