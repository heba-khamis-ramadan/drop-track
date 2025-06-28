import { Application, json, NextFunction, Request, Response } from "express";
import { connectDB } from "./DB/db.connection";
import errorService, { AppError } from "./Utils/error";
import * as controllers from "./Modules";

export const controllerHandler =  (app: Application) => {
     // parse data from json
     app.use(json());

     // connect to db
     connectDB();

    // import controllers
    app.use("/auth", controllers.authController);
    app.use("/drops", controllers.dropController);
    app.use("/ratings", controllers.ratingController);
    app.use("/users", controllers.userController);

     // handle invalid req
     app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
         res.status(404).json({message: "invalid url :("});
     });

     //=== global error handler ===//
     app.use(errorService.globalErrorHandler as (error: AppError, req: Request, res: Response, next: NextFunction) => void);
};