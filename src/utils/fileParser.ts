import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const extractFile = async (file: any) => {
  if (!file) {
    throw new Error("File is required!");
  }
  const mimetype = file.mimetype;
  if (mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    return data.text;
  }
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }
  throw new Error("Unsupported file format");
};
