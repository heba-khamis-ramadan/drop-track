import { Router } from "express";
import AuthMiddlewareService from "../../Middlewares/auth.middleware";
import ValidationMiddlewareService from "../../Middlewares/validation.middleware";
import ErrorService from "../../Utils/error"
import DropService from "./drop.service"
import { dropSchema } from "./drop.schema";

const dropController = Router();

dropController.post("/create", 
  ErrorService.asyncHandler(AuthMiddlewareService.authentication),
  ValidationMiddlewareService.isValid(dropSchema),
  ErrorService.asyncHandler(DropService.create_drop)
);

dropController.get(
  "/nearby",
  ErrorService.asyncHandler(DropService.get_near_drops)
);

dropController.get("/:dropId",ErrorService.asyncHandler(DropService.get_drop));

dropController.get("/", ErrorService.asyncHandler(DropService.get_drops));

export default dropController;