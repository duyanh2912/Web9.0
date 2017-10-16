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
    var yesPercent = question.yes / (question.yes + question.no) * 100;
    res.render("specific-question", {
        questionContent: question.content,
        questionYes: question.yes,
        questionNo: question.no,
        yesPercent: yesPercent ? yesPercent : 50,
        cssPath: "/static/css/specific-question.css"
    });
});
router.post("/", function (req, res) {
    switch (req.body.action) {
        case "ask": {
            var id = questionApi.addQuestion(req.body.question);
            res.redirect("/question/" + id);
            return;
        }
        case "answer": {
            var id = req.body.id;
            var vote = req.body.vote === "yes";
            questionApi.voteFor(id, vote);
            res.redirect("/question/" + id);
            return;
        }
        default:
            res.send("Invalid post");
            return;
    }
});
exports.default = router;
//# sourceMappingURL=questionRouter.js.map