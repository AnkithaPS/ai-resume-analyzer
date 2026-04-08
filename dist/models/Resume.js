"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const resumeSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
    },
    resumeText: {
        type: String,
    },
    analysis: {
        type: Object,
    },
}, { timestamps: true });
const Resume = mongoose_1.default.model("Resume", resumeSchema);
exports.default = Resume;
