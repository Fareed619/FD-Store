import { Router } from "express";
import { auth, isAdmin } from "../middlewares/authMiddleware.js";
import UserModel from "../models/UserModel.js";

const router = Router();

// Get All Users => http://localhost:4000/api/users
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const users = await UserModel.find({}).select("-password");
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get specific user => http://localhost:4000/api/users/:userId
router.get("/:userId", auth, isAdmin, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("User Not Found");
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
// Update user => http://localhost:4000/api/users/:userId
router.put("/:userId", auth, isAdmin, async (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;
  try {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("User Not Found");
    }
    user.email = email || user.email;
    user.username = username || user.username;
    const updatedUser = await user.save();
    res.status(201).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete user => http://localhost:4000/api/users/:userId
router.delete("/:userId", auth, isAdmin, async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);
    if (user && user.isAdmin) {
      throw new Error("Can't Delete An Admin");
    }
    const deletedUser = await UserModel.findOneAndDelete({
      _id: userId,
    }).select("-password");
    res.json({ deletedUser, message: "User Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
export default router;
