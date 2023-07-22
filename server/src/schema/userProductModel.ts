import mongoose from "mongoose";

const userProductSchema = new mongoose.Schema({
  userEmail: String,
  productId: Number,
  title: String,
  price: Number,
  description: String,
  image: String,
  quantity: {
    type: Number,
    default: 1,
  },
  isCart: {
    type: Boolean,
    default: false,
  },
  isBuyed: {
    type: Boolean,
    default: false,
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
  review: String,
  isReviewed: {
    type: Boolean,
    default: false,
  },
  reject: {
    type: Boolean,
    default: false,
  },
  userName: String,
});

export type userProductType = typeof userProductSchema;
export const UserProduct = mongoose.model("userproducts", userProductSchema);
