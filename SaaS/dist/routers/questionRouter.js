"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var questionApi = require("../api/question");
var router = express.Router();
router.get("/", function (req, res) {
    var question = questionApi.randomQuestion();
    if (!question) {
        res.render("error-page", {
            error: "There are no question yet.",
            cssPath: "/static/css/error-page.css"
        });
        return;
    }
    res.render("random-question", {
        questionId: question.id,
        questionContent: question.content,
        cssPath: "/static/css/random-question.css",
    });
});
router.get("/:id", function (req, res) {
    var question = questionApi.getQuestion(req.params.id);
    if (!question) {
        res.render("error-page", {
            error: "Invalid question id.",
            cssPath: "/static/css/error-page.css"
        });
        return;
    }
    var yesPercent = question.yes / (question.yes + question.no) * 100;
    res.render("specific-question", {
        questionContent: question.content,
        questionYes: question.yes,
        questionNo: question.no,
        yesPercent: !isNaN(yesPercent) ? yesPercent : 50,
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