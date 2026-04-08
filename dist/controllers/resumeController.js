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
exports.analyze = void 0;
const aiServices_1 = require("../services/aiServices");
const Resume_1 = __importDefault(require("../models/Resume"));
const analyze = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resumeText } = req.body;
        if (!resumeText) {
            return res.status(400).json({ message: "Resume text is required" });
        }
        const analyzedData = yield (0, aiServices_1.resumeAnalyzer)(resumeText);
        const resume = yield Resume_1.default.create({
            userId: req.user.id || "quest",
            resumeText,
            analysis: analyzedData,
        });
        res
            .status(200)
            .json({ message: "Resume analyzed successfully!", data: resume });
    }
    catch (error) {
        next(error);
    }
});
exports.analyze = analyze;
