import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *          description: success
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: User registered successfully!
 *       400:
 *          description: Bad Request
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Email already exists!
 */
userRouter.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *          description: success
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: User logged in successfully
 *                          token:
 *                              type: string
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDYzYWI3NGE1ZDUxNzVjZjI3MGIyNiIsImlhdCI6MTc3ODU3NjQyOSwiZXhwIjoxNzc4NjYyODI5fQ.aOB-YTRmIlt-YOOpnptaDP0pVFHxxJHP9RAO-Kt53x0
 *
 *       404:
 *          description: Not Found
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: User not found!
 *       400:
 *          description: Bad Request
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: Invalid Password!
 *
 */
userRouter.post("/login", loginUser);
export { userRouter };
