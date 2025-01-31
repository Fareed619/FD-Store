import { auth, isAdmin } from "../middlewares/authMiddleware.js";
import CategoryModel from "../models/CategoryModel.js";
import { Router } from "express";

const router = Router();

// Get All Categories  =>> http://localhost:4000/api/category/categories
router.get("/categories", auth, async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    if (!categories) {
      return res.status(400).json({ message: "There are not categories" });
    }

    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get Category    =>> http://localhost:4000/api/category/:categoryId
router.get("/:categoryId", auth, async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category Not Found" });
    }
    res.json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Add Category  => http://localhost:4000/api/category
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryModel.findOne({ name });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCateogry = new CategoryModel({
      name,
    });
    await newCateogry.save();
    res.json({ category: newCateogry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Update Category   =>> http://localhost:4000/api/category/:categoryId
router.put("/:categoryId", auth, isAdmin, async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name } = req.body;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Category Not Found" });
    }
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    category.name = name;
    await category.save();
    res.json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete Category  =>> http://localhost:4000/api/category/:categoryId
router.delete("/:categoryId", auth, isAdmin, async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res
        .status(400)
        .json({ message: "There is no cateogry to delete" });
    }
    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
    res.json({ category: deletedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
export default router;
