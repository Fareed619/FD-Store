import { Schema, model } from "mongoose";

export const reviewSchema = Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const ProductModel = model("Products", ProductSchema);
export default ProductModel;
