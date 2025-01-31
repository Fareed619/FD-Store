import { Router } from "express";
import UserModel from "../models/UserModel.js";
import { authValidator } from "../utils/userValidator.js";
import { check, validationResult } from "express-validator";
import { generateToken, passwordEncreption } from "../utils/authFunctions.js";
import bcrypt from "bcryptjs";

const router = Router();

// Register New  User =>  http://localhost:4000/api/auth/register
router.post("/register", authValidator, async (req, res) => {
  // validate user
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, isAdmin } = req.body;
    // check if the user is in the database
    const userExiting = await UserModel.findOne({ email });
    if (userExiting) {
      throw new Error("User already exists");
    }

    const newUser = new UserModel({
      username,
      email,
      isAdmin: isAdmin ? isAdmin : false,
    });

    // hash password and injected into the user schema
    newUser.password = await passwordEncreption(password);
    await newUser.save();

    // generate token and send it into a cookie
    generateToken({ username, _id: newUser._id }, res);
    return res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      _id: newUser._id,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: [{ msg: error.message }] });
  }
});

// Login User => http://localhost:4000/api/auth/login
router.post(
  "/login",
  check("email", "Invalid Email").isEmail(),
  check("password", "Password must be between 6 to 15 charaters"),
  async (req, res) => {
    // validation for user's fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        throw new Error("User Not Found, please sign up first");
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        throw new Error(" Password not correct");
      }

      generateToken(
        { username: existingUser.username, _id: existingUser._id },
        res
      );
      return res.status(200).json({
        username: existingUser.username,
        email: existingUser.email,
        _id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

// logout  => http://localhost:4000/api/auth/logout
router.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Logged out Successfuly" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default router;
