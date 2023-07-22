import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  userName: {
    type: String,
  },
  message: {
    type: String,
  },
  adminId: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  role: {
    type: String,
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
