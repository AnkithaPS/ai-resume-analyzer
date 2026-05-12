import express from "express";
import { analyze, analyzeFile } from "../controllers/resumeController";
import { authHandler } from "../middlewares/auth";
import { limit } from "../middlewares/rateLimiter";
import { upload } from "../middlewares/upload";

const resumeRouter = express.Router();
/**
 * @swagger
 * tags:
 *    name: Resume Analyzer
 *    description: Analyze Resume Api
 */

/**
 * @swagger
 * /api/resume/analyzer:
 *   post:
 *     summary: Analyze Resume by json data
 *     tags: [Resume Analyzer]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - resumeText
 *            properties:
 *              resumeText:
 *                type: string
 *                example: Experienced Node.js developer...
 *              jobDescription:
 *                type: string
 *                example: Node.js, Express...,
 *              includeATS:
 *                type: boolean
 *                example: true
 *     responses:
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Resume analyzed successfully!
 *                data:
 *                  type: object
 *                  example:
 *                    resumeText: Experienced Node.js developer...
 *                    jobDescription: Node.js, Express...
 *                    analysis:
 *                      score: 89
 *                      strengths: Strong Node.js knowledge
 *                      weaknesses: Limited testing experience
 *                      missingSkills: next.js
 *                      suggestions: Add more backend projects
 *                    ats:
 *                       atsScore: 89
 *                       matchedKeywords: Node.js, Express
 *                       missingKeywords: next.js
 *                       suggestions: Add more backend projects
 *      400:
 *        description: Bad Request
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                     example: Resume text is required
 *
 *
 *
 */

resumeRouter.post("/analyzer", authHandler, limit, analyze);

/**
 * @swagger
 * /api/resume/analyzer/file:
 *   post:
 *     summary: Analyze Resume by file upload
 *     tags: [Resume Analyzer]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - resume
 *            properties:
 *              resume:
 *                type: file
 *                example: resume.pdf
 *              jobDescription:
 *                type: string
 *                example: Node.js, Express...,
 *              includeATS:
 *                type: boolean
 *                example: true
 *     responses:
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Resume analyzed successfully!
 *                data:
 *                  type: object
 *                  example:
 *                    resumeText: resume.pdf
 *                    jobDescription: Node.js, Express...
 *                    analysis:
 *                      score: 89
 *                      strengths: Strong Node.js knowledge
 *                      weaknesses: Limited testing experience
 *                      missingSkills: next.js
 *                      suggestions: Add more backend projects
 *                    ats:
 *                       atsScore: 89
 *                       matchedKeywords: Node.js, Express
 *                       missingKeywords: next.js
 *                       suggestions: Add more backend projects
 *
 *      400:
 *        description: Bad Request
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                     example: Resume file is required
 */

resumeRouter.post(
  "/analyzer/file",
  authHandler,
  limit,
  upload.single("resume"),
  analyzeFile,
);

export { resumeRouter };
