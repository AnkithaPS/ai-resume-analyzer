import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import { resumeRouter } from "./routes/resumeRouter";
import { userRouter } from "./routes/userRouter";
import { swaggerSpec, swaggerUi } from "./config/swagger";
dotenv.config();

const app = express();
app.use(express.json());

//Connect DB
connectDB();
//Routes
app.use("/api/auth", userRouter);
app.use("/api/resume", resumeRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//Middleware error handling
app.use(errorHandler);
//Server start

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
