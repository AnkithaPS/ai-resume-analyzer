import express from "express";
import { analyze, analyzeFile } from "../controllers/resumeController";
import { authHandler } from "../middlewares/auth";
import { limit } from "../middlewares/rateLimiter";
import { upload } from "../middlewares/upload";

const resumeRouter = express.Router();
resumeRouter.post("/analyzer", authHandler, limit, analyze);
resumeRouter.post(
  "/analyzer/file",
  authHandler,
  limit,
  upload.single("resume"),
  analyzeFile,
);

export { resumeRouter };
