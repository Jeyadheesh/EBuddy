"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const chatModel_1 = require("./schema/chatModel");
// import { AxiosError } from "axios";
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: __dirname + "\\.env" });
const port = process.env.PORT;
// console.log("env : " + process.env.PORT);
// console.log(__dirname + "\\.env");
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_PORT,
    credentials: true,
}));
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_PORT,
        methods: ["GET", "POST"],
    },
});
// Chat
io.on("connect", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User Connected : ", socket.id);
    socket.on("joinuser", (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(data);
        const recData = yield chatModel_1.Chat.find({ userId: data });
        socket.emit("receiveMsg", recData);
    }));
    socket.on("sendMsg", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const msgData = yield chatModel_1.Chat.create({
            userId: data.userId,
            senderId: data.senderId,
            userName: data.userName,
            adminId: data.adminId,
            message: data.message,
            role: data.role,
            time: data.time,
            date: data.date,
        });
        const recData = yield chatModel_1.Chat.find({ userId: data.userId });
        socket.to(data.userId).emit("receiveMsg", recData);
        // console.log(data);
    }));
    socket.on("disconnect", () => {
        console.log("Disconnned Id : ", socket.id);
    });
}));
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.ATLAS_URL);
            console.log("Connected");
        }
        catch (error) {
            console.log("Not Connected :", error.message);
        }
    });
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
