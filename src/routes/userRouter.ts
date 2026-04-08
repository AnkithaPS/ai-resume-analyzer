import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/login", loginUser);

export { userRouter };
