import { Router } from "express";
import { auth, isAdmin } from "../middlewares/authMiddleware.js";
import ProductModel from "../models/ProductModel.js";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";

const router = Router();

// Get All Products  http://localhost:4000/api/products/allproducts
router.get("/allproducts", auth, async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// To Get Products ( 6 )   => http://localhost:4000/api/products
router.get("/", auth, async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await ProductModel.countDocuments({ ...keyword });
    const products = await ProductModel.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Get product by id  => http://localhost:4000/api/products/:productId
router.get("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Product not found" });
  }
});

// Add Product  => http://localhost:4000/api/products
router.post("/", auth, isAdmin, formidable(), async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // validation
    switch (true) {
      case !name:
        return res.json({ message: "Name is required" });
      case !brand:
        return res.json({ message: "Brand is required" });
      case !description:
        return res.json({ message: "Description is required" });
      case !price:
        return res.json({ message: "Price is required" });
      case !category:
        return res.json({ message: "Category is required" });
      case !quantity:
        return res.json({ message: "Quantity is required" });
    }

    const product = new ProductModel({ ...req.fields });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product => http://localhost:4000/api/products/:productId
router.put("/:productId", auth, isAdmin, formidable(), async (req, res) => {
  const { productId } = req.params;
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // validation
    switch (true) {
      case !name:
        return res.json({ message: "Name is required" });
      case !brand:
        return res.json({ message: "Brand is required" });
      case !description:
        return res.json({ message: "Description is required" });
      case !price:
        return res.json({ message: "Price is required" });
      case !category:
        return res.json({ message: "Category is required" });
      case !quantity:
        return res.json({ message: "Quantity is required" });
    }

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      {
        ...req.fields,
      },
      { new: true }
    );
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.messgae });
  }
});

// Delete Product  => http://localhost:4000/api/products/:productId
router.delete("/:productId", auth, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findByIdAndDelete(productId);
    res.json({ product, message: "Product Deleted Successfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Add reviews to the product  => http://localhost:4000/api/products/:productId/reviews
router.post("/:productId/reviews", auth, checkId, async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const product = await ProductModel.findById(productId);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product Already reviewed");
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Get Top Products  => http://localhost:4000/api/products/top/products
router.get("/top/products", auth, async (req, res) => {
  try {
    const products = await ProductModel.find({}).sort({ rating: -1 }).limit(4);
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Get New Products  => http://localhost:4000/api/products/new/products
router.get("/new/products", auth, async (req, res) => {
  try {
    const products = await ProductModel.find({}).sort({ _id: -1 }).limit(5);
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Filtered Products  http://localhost:4000/api/products/filter/filterd-products
router.post("/filter/filterd-products", async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
