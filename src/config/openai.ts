import openAI from "openai";
import dotenv from "dotenv";
dotenv.config();

//Configuration
export const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});
