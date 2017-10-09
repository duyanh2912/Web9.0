"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.listen(6969, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Website is up.");
    }
});
//# sourceMappingURL=app.js.map