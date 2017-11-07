"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var parser = require("body-parser");
var mongoose = require("mongoose");
var imageRouter_1 = require("./routers/imageRouter");
var userRouter_1 = require("./routers/userRouter");
var app = express();
// Middleware
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
// Router
app.use("/api/images", imageRouter_1.default);
app.use("/api/users", userRouter_1.default);
// Database
mongoose.connect("mongodb://localhost/TechKidsHotGirl", {
    useMongoClient: true
}, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("connect db success");
});
// Port
app.listen(6969, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Website is up at 6969");
    }
});
//# sourceMappingURL=app.js.map