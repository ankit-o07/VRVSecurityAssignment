import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";


// Middleware to authenticate the user using JWT
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided, authorization denied." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Middleware to authorize the user based on their role
export const authorizeRole = (role) => {
  return async (req, res, next) => {
    try {
        
      const user = await UserModel.findById(req.user._id);
      
      
      if (user.role !== role) {
        return res.status(403).json({ message: "Access denied, insufficient role." });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error. 33" });
    }
  };
};
