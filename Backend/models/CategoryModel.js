import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
