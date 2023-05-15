import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "must be at least 2 characters."],
      maxLength: [32, "must be between 32 characters."],
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
