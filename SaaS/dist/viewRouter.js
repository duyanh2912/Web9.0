"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var fs = require("fs");
var router = express.Router();
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ask/index.html"));
});
router.get("/question", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ask/question.json"));
});
router.post("/question", function (req, res) {
    var data = { questions: [] };
    try {
        data = JSON.parse(fs.readFileSync(path.join(__dirname, "../public/ask/question.json"), "utf-8"));
    }
    catch (err) {
        console.log(err);
    }
    if (!data.questions || !data.questions.length)
        data.questions = [];
    data.questions.push({
        content: req.body.question,
        yes: 0,
        no: 0,
    });
    fs.writeFileSync(path.join(__dirname, "../public/ask/question.json"), JSON.stringify(data, null, "  "), "utf-8");
    res.redirect("/ask");
});
exports.default = router;
//# sourceMappingURL=viewRouter.js.map