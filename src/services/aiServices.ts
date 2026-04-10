import openAI from "openai";
import dotenv from "dotenv";
dotenv.config();

//Configuration
const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const resumeAnalyzer = async (
  resumeText: string,
  jobDescription: string,
) => {
  const prompt = `
Analyze the following resume with job description and provide:
1. Score out of 100
2. Strengths
3. Weaknesses
4. Missing Skills
5. Suggestions for improvement

Resume:
Job Description: ${jobDescription}
Resume: ${resumeText}

Return response in JSON format.
`;
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
};
