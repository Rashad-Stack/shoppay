import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  reviewedBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  rating: { type: Number, required: true, default: 0 },
  review: { type: String, required: true },
  size: String,
  style: {
    color: String,
    image: String,
  },
  fit: String,
  images: [],
  likes: [],
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: String,
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    subCategory: {
      type: ObjectId,
      ref: "subCategory",
    },
    details: [
      {
        name: String,
        value: String,
      },
    ],
    questions: [
      {
        question: String,
        answer: String,
      },
    ],
    refundPolicy: {
      type: String,
      default: "30 days",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: { type: Number, required: true, default: 0 },
    subProducts: [
      {
        images: [],
        description_images: [],
        color: {
          color: String,
          image: String,
        },
        sizes: [{ size: String, qty: Number, price: Number }],
        discount: {
          type: Number,
          default: 0,
        },
        sold: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
