import express from "express";
import { analyze } from "../controllers/resumeController";
import { authHandler } from "../middlewares/auth";
const resumeRouter = express.Router();

resumeRouter.post("/analyzer", authHandler, analyze);

export { resumeRouter };
