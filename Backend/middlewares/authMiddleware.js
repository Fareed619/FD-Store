import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import "dotenv/config";

export const auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  if (!decoded) {
    return res.status(404).json({ message: "Invalid token, Not Authorized" });
  } else {
    try {
      const user = await UserModel.findById(decoded.user._id).select(
        "-password"
      );
      req.user = user;
      next();
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const isAdmin = async (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    return res.status(400).json({ message: "Not Authorized as an admin" });
  } else {
    next();
  }
};
