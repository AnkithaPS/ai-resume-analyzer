"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeAnalyzer = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Configuration
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const resumeAnalyzer = (resumeText) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = `
Analyze the following resume and provide:
1. Score out of 100
2. Strengths
3. Weaknesses
4. Missing Skills
5. Suggestions for improvement

Resume:
${resumeText}

Return response in JSON format.
`;
    const response = yield openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
});
exports.resumeAnalyzer = resumeAnalyzer;
