import mongoose from "mongoose";
import { User } from "./userModel";

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
  review: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userName: String,
        title: String,
        rating: Number,
        message: String,
      },
    ],
  },
});

export type productType = typeof productSchema;
export const Product = mongoose.model("products", productSchema);
