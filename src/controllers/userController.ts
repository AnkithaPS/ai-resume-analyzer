import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Register new user
const registerUser = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password is required" });
    }
    //check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    //hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    next(error);
  }
};

//Login User
const loginUser = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;
    //check existing user
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    //check password matching
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password!" });
    }
    //generate token
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
