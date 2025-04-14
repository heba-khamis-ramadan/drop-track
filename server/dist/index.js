"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_handler_1 = require("./controller.handler");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, controller_handler_1.controllerHandler)(app);
app.listen(port, () => {
    console.log("server is runing on port:", port);
});
