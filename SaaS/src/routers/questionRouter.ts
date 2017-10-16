import * as express from "express";
import * as questionApi from "../api/question";

const router = express.Router();

router.get("/", (req, res) => {
    const question = questionApi.randomQuestion();
    if (!question) {
        res.render("error-page", {
            error: "There are no question yet.",
            cssPath: "/static/css/error-page.css"
        });
        return;
    }

    res.render("random-question", {
        questionId: question!.id,
        questionContent: question!.content,
        cssPath: "/static/css/random-question.css",
    });
});

router.get("/:id", (req, res) => {
    const question = questionApi.getQuestion(req.params.id);
    if (!question) {
        res.render("error-page", {
            error: "Invalid question id.",
            cssPath: "/static/css/error-page.css"
        });
        return;
    }

    const yesPercent = question.yes / (question.yes + question.no) * 100;
    res.render("specific-question", {
        questionContent: question.content,
        questionYes: question.yes,
        questionNo: question.no,
        yesPercent: !isNaN(yesPercent) ? yesPercent : 50,
        cssPath: "/static/css/specific-question.css"
    });
});

router.post("/", (req, res) => {
    switch (req.body.action) {
        case "ask": {
            const id: number = questionApi.addQuestion(req.body.question);
            res.redirect(`/question/${id}`);
            return;
        }

        case "answer": {
            const id = req.body.id;
            const vote = req.body.vote === "yes";
            questionApi.voteFor(id, vote);
            res.redirect(`/question/${id}`);
            return;
        }

        default:
            res.send("Invalid post");
            return;
    }
});

export default router;