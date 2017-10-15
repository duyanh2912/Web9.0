"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var questionApi = require("../api/question");
var router = express.Router();
router.get("/", function (req, res) {
    var _a = questionApi.randomQuestion(), content = _a.content, id = _a.id;
    res.render("random-question", {
        questionId: id,
        questionContent: content,
        cssPath: "/static/css/random-question.css"
    });
});
router.get("/:id", function (req, res) {
    var question = questionApi.getQuestion(req.params.id);
    if (!question) {
        res.send("Invalid id.");
        return;
    }
    res.render("specificQuestion", {
        questionContent: question.content,
        questionYes: question.yes,
        questionNo: question.no
    });
});
router.post("/", function (req, res) {
    questionApi.addQuestion(req.body.question);
    res.redirect("/ask");
});
exports.default = router;
//# sourceMappingURL=questionRouter.js.map