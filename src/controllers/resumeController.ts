import { resumeAnalyzer } from "../services/aiServices";
import { extractFile } from "../utils/fileParser";
import Resume from "../models/Resume";

const analyze = async (req: any, res: any, next: any) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    const analyzedData = await resumeAnalyzer(resumeText, jobDescription);
    const resume = await Resume.create({
      userId: req.user.id || "guest",
      resumeText,
      jobDescription,
      analysis: analyzedData,
    });
    res
      .status(200)
      .json({ message: "Resume analyzed successfully!", data: resume });
  } catch (error) {
    next(error);
  }
};

//analyze data by uploading file
const analyzeFile = async (req: any, res: any, next: any) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;
    if (!file) {
      return res.status(400).json({ message: "Resume file is required" });
    }
    //Extract text from file
    const resumeText = await extractFile(file);
    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        message: "Unable to extract sufficient text from file",
      });
    }
    const analyzedData = await resumeAnalyzer(resumeText, jobDescription);
    const resume = await Resume.create({
      userId: req.user.id || "guest",
      resumeText,
      jobDescription,
      analysis: analyzedData,
    });
    res
      .status(200)
      .json({ message: "Resume analyzed successfully!", data: resume });
  } catch (error) {
    next(error);
  }
};
export { analyze, analyzeFile };
