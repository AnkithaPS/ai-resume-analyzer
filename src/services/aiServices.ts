import { openai } from "../config/openai";
import { getRelevantChunks } from "./vectorServices";
import { getCache, setCache } from "./redisService";
import crypto from "crypto";

//function for communicating with AI
const callOpenAI = async (prompt: string) => {
  const cacheKey = `ai:${crypto
    .createHash("md5")
    .update(prompt)
    .digest("hex")}`;
  //check cache
  const cached = await getCache(cacheKey);
  if (cached) {
    console.log("Cache HIT");
    return cached;
  }
  console.log("Cache MISS");
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const result = response.choices[0].message.content;
  let parse;
  try {
    parse = JSON.parse(result!);
  } catch {
    parse = { raw: result };
  }
  //Store cache
  const store = await setCache(cacheKey, parse);

  return parse;
};

//Resume Analyzer
export const analyzeResume = async (
  resumeText: string,
  jobDescription: string,
  userId: string,
) => {
  const query =
    jobDescription ||
    "Extract key skills, experience, and achievements from this resume";
  const relevantChunks = await getRelevantChunks(query, userId);
  const context =
    relevantChunks.length > 0 ? relevantChunks.join("\n") : resumeText;

  const prompt = `
Analyze the resume using the following relevant context:

${context}

${jobDescription ? `Also consider the job description:\n${jobDescription}` : ""}

Return STRICT JSON:

{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "missingSkills": string[],
  "suggestions": string[]
}
`;

  return callOpenAI(prompt);
};

//ATS analyzer
export const analyzeATS = async (
  resumeText: string,
  jobDescription: string,
  userId: string,
) => {
  const relevantChunks = await getRelevantChunks(jobDescription, userId);

  const context =
    relevantChunks.length > 0 ? relevantChunks.join("\n") : resumeText;
  const prompt = `
You are an ATS system.

Compare the resume with the job description using the context below.

Context:
${context}

Job Description:
${jobDescription}

Return STRICT JSON:

{
  "atsScore": number,
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "suggestions": string[]
}
  `;
  return callOpenAI(prompt);
};
