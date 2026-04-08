"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const resumeRouter_1 = require("./routes/resumeRouter");
const userRouter_1 = require("./routes/userRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Connect DB
(0, db_1.connectDB)();
//Routes
app.use("/api/auth", userRouter_1.userRouter);
app.use("/api/resume", resumeRouter_1.resumeRouter);
//Middleware error handling
app.use(errorHandler_1.default);
//Server start
const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`Server is running on Port ${Port}`);
});
