"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var parser = require("body-parser");
var exhbs = require("express-handlebars");
var path_1 = require("./path");
var testController_1 = require("./controllers/testController");
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
    res.render("test", {
        testData: testController_1.getTestData()
    });
});
app.post("/answer", function (req, res) {
    res.render("result", {
        result: testController_1.checkAnswers(req.body.params)
    });
});
app.post("/api/answer", function (req, res) {
    res.send({
        score: testController_1.checkAnswers(req.body),
        answers: testController_1.getCorrectAnswers()
    });
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