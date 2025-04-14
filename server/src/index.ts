import express from "express";
//import { controllerHandler } from "./controller.handler";

const app: express.Application = express();

const port: string|number = process.env.PORT || 3000;

//controllerHandler(app);

app.listen(port, () => {
    console.log("server is runing on port:", port);
});