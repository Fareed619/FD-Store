import { Router } from "express";
import { auth, isAdmin } from "../middlewares/authMiddleware.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
const router = Router();

// Get My profile =>> http://localhost:4000/api/profiles
router.get("/", auth, async (req, res) => {
  const userInfo = req.user;
  try {
    const user = await UserModel.findById(userInfo._id).select("-password");
    if (!user) {
      throw new Error("User Not Found");
    }
    res.status({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {}
});

// Update My Profile   ===>>> http://localhost:4000/api/profiles
router.put("/", auth, async (req, res) => {
  const { username, email, password } = req.body;
  const userInfo = req.user;
  try {
    const user = await UserModel.findOne({ email: userInfo.email });
    if (!user) {
      throw new Error("User Not Found");
    }
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      const salt = bcrypt.getSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Delete My Profile =>> http://localhost:4000/api/profiles
router.delete("/", auth, async (req, res) => {
  const userInfo = req.user;
  try {
    const deletedUser = await UserModel.findOneAndDelete({
      email: userInfo.email,
    });

    res.json({
      _id: deletedUser._id,
      username: deletedUser.username,
      email: deletedUser.email,
      isAdmin: deletedUser.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
