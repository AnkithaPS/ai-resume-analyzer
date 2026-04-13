import openAI from "openai";
import dotenv from "dotenv";
dotenv.config();

//Configuration
const openai = new openAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//function for communicating with AI
const callOpenAI = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const result = response.choices[0].message.content;

  try {
    return JSON.parse(result!);
  } catch {
    return { raw: result };
  }
};

//Resume Analyzer
export const analyzeResume = async (
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
  return callOpenAI(prompt);
};

//ATS analyzer
export const analyzeATS = async (
  resumeText: string,
  jobDescription: string,
) => {
  const prompt = `
You are an ATS system.

Compare the resume with the job description and return STRICT JSON:

{
  "atsScore": number (0-100),
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "suggestions": string[]
}

Job Description:
${jobDescription}

Resume:
${resumeText}
`;
  return callOpenAI(prompt);
};
