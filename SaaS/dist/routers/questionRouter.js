"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var questionApi = require("../api/question");
var router = express.Router();
router.get("/", function (req, res) {
    var _a = questionApi.randomQuestion(), question = _a.content, yes = _a.yes, no = _a.no;
    res.render("question", {
        question: question,
        yes: yes,
        no: no,
    });
});
router.get("/:id", function (req, res) {
    console.log(req.query);
    res.send(req.params);
});
router.post("/", function (req, res) {
    questionApi.addQuestion(req.body.question);
    res.redirect("/ask");
});
exports.default = router;
//# sourceMappingURL=questionRouter.js.map