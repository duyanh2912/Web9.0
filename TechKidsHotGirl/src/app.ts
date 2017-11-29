import * as express from "express";
import * as parser from "body-parser";
import * as exhbs from "express-handlebars";
import * as mongoose from "mongoose";
import imageRouter from "./routers/imageRouter";
import userRouter from "./routers/userRouter";
import {layoutsFolder, staticFolder, viewsFolder} from "./path";
import * as session from "express-session";
import * as http from "http";
import * as socket from "socket.io";
import cookieParser = require("cookie-parser");

const config = require("../config.json");

const connectionString = process.env.PORT ? config.production.connectionString : config.development.connectionString;
const port = process.env.PORT ? process.env.PORT : config.development.port;

let app = express();

// Config handlebars
app.engine("handlebars", exhbs({
    defaultLayout: "main",
    layoutsDir: layoutsFolder
}));
app.set("view engine", "handlebars");
app.set("views", viewsFolder);

// Middleware
app.use("/static", express.static(staticFolder));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(session({secret: "keyboard cat", cookie: {maxAge: 60000}}));
app.use(cookieParser());

// Router
app.get("/", (req, res) => {
    res.render("home", {
        username: req.session!.username || req.cookies.username || undefined
    });
});
app.get("/chat", (req, res) => {
    res.render("chat");
});
app.use("/api/images", imageRouter);
app.use("/api/users", userRouter);

// Database
mongoose.connect(connectionString, {
    useMongoClient: true
}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("connect db success");
});

// Socket.io
const server = http.createServer(app);
const io = socket(server);

const userList: any[] = [];

io.on("connection", socket => {
    socket.on("userSendMessage", data => {
        console.log(userList);
        let user = userList.find(ele => ele.username === data.recipient);
        if (user) {
            io.to(user.socketId).emit("newMessage", {
                sender: data.username,
                message: data.message
            });
        }
    });
    socket.on("userJoin", data => {
        userList.push({username: data.username, socketId: socket.id});
        socket.broadcast.emit("userConnect", `${data.username} connected`);
    });
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected.`);
    });
});

// Port
server.listen(port, (err: string) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Website is up at ${port}`);
    }
});