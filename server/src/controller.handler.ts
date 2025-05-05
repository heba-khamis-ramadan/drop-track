import { Application, json, NextFunction, Request, Response } from "express";
import { connectDB } from "./DB/db.connection";
import errorService from "./Utils/error";

export const controllerHandler =  (app: Application) => {
     // parse data from json
     app.use(json());

     // connect to db
     connectDB();

     // handle invalid req
     app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
         res.status(404).json({message: "invalid url :("});
     });

     //=== global error handler ===//
     //app.use(errorService.globalErrorHandler(error: Error,req: Request, res: Response, next: NextFunction));
};