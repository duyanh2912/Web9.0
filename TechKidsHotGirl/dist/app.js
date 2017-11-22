"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var parser = require("body-parser");
var exhbs = require("express-handlebars");
var mongoose = require("mongoose");
var imageRouter_1 = require("./routers/imageRouter");
var userRouter_1 = require("./routers/userRouter");
var path_1 = require("./path");
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
// Router
app.get("/", function (req, res) {
    res.render("home");
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
// Port
app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Website is up at " + port);
    }
});
//# sourceMappingURL=app.js.map