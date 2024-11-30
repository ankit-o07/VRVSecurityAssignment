import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";

// Register a user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name , email , password )
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    
    await newUser.save();
    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201)
            .json({
                message:"Signup successfully",
                success:true,
                token:token
            })
  } catch (error) {
    res.status(500)
            .json({
                message:"Internal server error",
                success:false 
            })
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201)
            .json({
                message:"Signup successfully",
                success:true,
                token:token,
                user:user.name
            })
  } catch (error) {
    res.status(500)
            .json({
                message:"Internal server error",
                success:false 
            })
  }
};

// Logout a user
export const logout = (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
};


