import { resumeAnalyzer } from "../services/aiServices";
import Resume from "../models/Resume";

const analyze = async (req: any, res: any, next: any) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    const analyzedData = await resumeAnalyzer(resumeText);
    const resume = await Resume.create({
      userId: req.user.id || "quest",
      resumeText,
      analysis: analyzedData,
    });
    res
      .status(200)
      .json({ message: "Resume analyzed successfully!", data: resume });
  } catch (error) {
    next(error);
  }
};

export { analyze };
