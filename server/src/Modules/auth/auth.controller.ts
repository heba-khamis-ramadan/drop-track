import { Router } from "express";
import AuthMiddlewareService from "../../Middlewares/auth.middleware";
import ValidationMiddlewareService from "../../Middlewares/validation.middleware";
import ErrorService from "../../Utils/error"
import AuthService from "./auth.service"
import { signupSchema } from "./auth.schema";

const authController = Router();

authController.post("/signup",
    //ValidationMiddlewareService.isValid(signupSchema),
    ErrorService.asyncHandler(AuthService.signup)
);

authController.post("/login", ErrorService.asyncHandler(AuthService.login));

authController.put("/logout", ErrorService.asyncHandler(AuthMiddlewareService.authentication), ErrorService.asyncHandler(AuthService.logout));


export default authController;
