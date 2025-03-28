import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const passwordEncreption = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);

  return hasedPassword;
};

export const generateToken = (userInfo, res) => {
  const payload = { user: userInfo };
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "30d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    expires:  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return token;
};
