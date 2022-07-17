"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DATABASE = String(process.env.DATABASE);
mongoose_1.default.connect(DATABASE, (err) => {
    if (!err)
        console.log("Database connected");
    else
        console.log("Connection error :" + err);
});
