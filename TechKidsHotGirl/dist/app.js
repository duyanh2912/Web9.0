"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var parser = require("body-parser");
var exhbs = require("express-handlebars");
var mongoose = require("mongoose");
var imageRouter_1 = require("./routers/imageRouter");
var userRouter_1 = require("./routers/userRouter");
var path_1 = require("./path");
var session = require("express-session");
var http = require("http");
var socket = require("socket.io");
var cookieParser = require("cookie-parser");
var config = require("../config.json");
var connectionString = process.env.PORT ? config.production.connectionString : config.development.connectionString;
var port = process.env.PORT ? process.env.PORT : config.development.port;
var app = express();
// Config handlebars
app.engine("handlebars", exhbs({
    defaultLayout: "main",
    layoutsDir: path_1.layoutsFolder
}));
app.set("view engine", "handlebars");
app.set("views", path_1.viewsFolder);
// Middleware
app.use("/static", express.static(path_1.staticFolder));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
app.use(cookieParser());
// Router
app.get("/", function (req, res) {
    res.render("home", {
        username: req.session.username || req.cookies.username || undefined
    });
});
app.get("/chat", function (req, res) {
    res.render("chat");
});
app.use("/api/images", imageRouter_1.default);
app.use("/api/users", userRouter_1.default);
// Database
mongoose.connect(connectionString, {
    useMongoClient: true
}, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("connect db success");
});
// Socket.io
var server = http.createServer(app);
var io = socket(server);
var userList = [];
io.on("connection", function (socket) {
    socket.on("userSendMessage", function (data) {
        console.log(userList);
        var user = userList.find(function (ele) { return ele.username === data.recipient; });
        if (user) {
            io.to(user.socketId).emit("newMessage", {
                sender: data.username,
                message: data.message
            });
        }
    });
    socket.on("userJoin", function (data) {
        userList.push({ username: data.username, socketId: socket.id });
        socket.broadcast.emit("userConnect", data.username + " connected");
    });
    socket.on("disconnect", function () {
        console.log(socket.id + " disconnected.");
    });
});
// Port
server.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Website is up at " + port);
    }
});
//# sourceMappingURL=app.js.map