import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Authentication check
export const authHandler = async (req: any, res: any, next: any) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Authentication failed!" });
  }
  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  req.user = decoded;
  next();
};
