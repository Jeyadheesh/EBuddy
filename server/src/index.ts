import express, { Express, Request, Response } from "express";
const app: Express = express();
import cors from "cors";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { Chat } from "./schema/chatModel";
// import { AxiosError } from "axios";
import { Server } from "socket.io";
import { createServer } from "http";

import { config } from "dotenv";
config({ path: __dirname + "\\.env" });
const port = process.env.PORT;

// console.log("env : " + process.env.PORT);
// console.log(__dirname + "\\.env");

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_PORT,
    methods: ["GET", "POST"],
  },
});

// Chat

io.on("connect", async (socket) => {
  console.log("User Connected : ", socket.id);

  socket.on("joinuser", async (data) => {
    socket.join(data);
    const recData = await Chat.find({ userId: data });
    socket.emit("receiveMsg", recData);
  });

  socket.on("sendMsg", async (data) => {
    const msgData = await Chat.create({
      userId: data.userId,
      senderId: data.senderId,
      userName: data.userName,
      adminId: data.adminId,
      message: data.message,
      role: data.role,
      time: data.time,
      date: data.date,
    });

    const recData = await Chat.find({ userId: data.userId });
    socket.to(data.userId).emit("receiveMsg", recData);
    // console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnned Id : ", socket.id);
  });
});

async function checkConnection() {
  try {
    await mongoose.connect(process.env.ATLAS_URL as string);
    console.log("Connected");
  } catch (error: any) {
    console.log("Not Connected :", error.message);
  }
}
checkConnection();

app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/usercart", require("./routes/userProducts"));
app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/admin"));

// app.get("/", (req: Request, res: Response) => {
//   res.send("Done");
// });

server.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
