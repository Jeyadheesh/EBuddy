import mongoose from "mongoose";

const profileImgSchema = new mongoose.Schema({
  userEmail: String,
  profileImg: {
    type: {
      data: Buffer,
      contentType: String,
    },
  },
});

const userSchema = new mongoose.Schema({
  address: String,
  cardno: Number,
  city: String,
  conPassword: String,
  cvcno: Number,
  email: String,
  name: String,
  password: String,
  phno: {
    type: [Number, "Phone Number must be Number"],
  },
  role: {
    type: String,
    default: "user",
  },
  profileImgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfileImg",
  },
});

export type userType = typeof userSchema;
export const ProfileImg = mongoose.model("ProfileImg", profileImgSchema);
export const User = mongoose.model("UserSchema", userSchema);
