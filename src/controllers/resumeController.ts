import { analyzeResume, analyzeATS } from "../services/aiServices";
import { extractFile } from "../utils/fileParser";
import Resume from "../models/Resume";

const analyze = async (req: any, res: any, next: any) => {
  try {
    const { resumeText, jobDescription, includeATS } = req.body;
    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    //Analyze resume
    const analyzedData = await analyzeResume(resumeText, jobDescription);

    // ATS only if explicitly requested
    const atsData =
      includeATS && jobDescription
        ? analyzeATS(resumeText, jobDescription)
        : Promise.resolve(null);

    // Run in parallel
    const [analysis, ats] = await Promise.all([analyzedData, atsData]);
    const resume = await Resume.create({
      userId: req.user.id || "guest",
      resumeText,
      jobDescription,
      analysis,
      ats,
    });
    res.status(200).json({
      message: "Resume analyzed successfully!",
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};

//analyze data by uploading file
const analyzeFile = async (req: any, res: any, next: any) => {
  try {
    const file = req.file;
    const { jobDescription, includeATS } = req.body;
    if (!file) {
      return res.status(400).json({ message: "Resume file is required" });
    }
    //Extract text from file
    const resumeText = await extractFile(file);
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Unable to extract sufficient text from file",
      });
    }

    //Analyze resume
    const analyzedData = await analyzeResume(resumeText, jobDescription);

    // ATS only if explicitly requested
    const atsData =
      includeATS && jobDescription
        ? analyzeATS(resumeText, jobDescription)
        : Promise.resolve(null);

    // Run in parallel
    const [analysis, ats] = await Promise.all([analyzedData, atsData]);
    const resume = await Resume.create({
      userId: req.user.id || "guest",
      resumeText,
      jobDescription,
      analysis,
      ats,
    });
    res
      .status(200)
      .json({ message: "Resume analyzed successfully!", data: resume });
  } catch (error) {
    next(error);
  }
};
export { analyze, analyzeFile };
