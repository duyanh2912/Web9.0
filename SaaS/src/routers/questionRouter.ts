import * as express from "express";
import * as questionApi from "../api/question"

const router = express.Router();

router.get("/", (req, res) => {
    const {content, id} = questionApi.randomQuestion();
    res.render("random-question", {
        questionId: id,
        questionContent: content,
        cssPath: "/static/css/random-question.css"
    })
});

router.get("/:id", (req, res) => {
    const question = questionApi.getQuestion(req.params.id);
    if (!question) {
        res.send("Invalid id.");
        return;
    }

    res.render("specificQuestion", {
        questionContent: question.content,
        questionYes: question.yes,
        questionNo: question.no
    })
});

router.post("/", (req, res) => {
    questionApi.addQuestion(req.body.question);
    res.redirect("/ask");
});

export default router;