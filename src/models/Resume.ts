import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    resumeText: {
      type: String,
    },
    jobDescription: {
      type: String,
    },
    analysis: {
      type: Object,
    },
    ats: {
      type: Object,
    },
  },
  { timestamps: true },
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
