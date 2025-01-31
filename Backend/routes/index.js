import { Router } from "express";
// All Routes
import authRoutes from "./authRoutes.js";
import profileRoutes from "./profileRoutes.js";
// Admin
import usersRoutes from "./usersRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import uploadRoute from "./uploadRoute.js";
import orderRoute from "./orderRoutes.js";
import pymentRoute from "./paymentRoute.js";
const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/profiles", profileRoutes);
// Admin Routes
router.use("/api/users", usersRoutes);
router.use("/api/category", categoryRoutes);
router.use("/api/products", productRoutes);
router.use("/api/orders", orderRoute);
router.use("/api/uploads", uploadRoute);
router.use("/api/stripe", pymentRoute);

export default router;
