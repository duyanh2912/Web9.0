import * as express from "express";
import * as questionApi from "../controllers/questionController";
import renderErrorPage from "./renderErrorPage";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const question = await questionApi.randomQuestion();
        res.render("random-question", {
            questionId: question!.id,
            questionContent: question!.content,
            cssPath: "/static/css/random-question.css",
        });
    } catch (err) {
        renderErrorPage(res, err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const question = await questionApi.getQuestion(req.params.id);
        const yesPercent = question.yes / (question.yes + question.no) * 100;

        res.render("specific-question", {
            questionContent: question.content,
            questionYes: question.yes,
            questionNo: question.no,
            yesPercent: !isNaN(yesPercent) ? yesPercent : 50,
            cssPath: "/static/css/specific-question.css"
        });
    } catch (err) {
        renderErrorPage(res, err);
    }
});

router.post("/", async (req, res) => {
    try {
        const id = await questionApi.addQuestion(req.body.question);
        res.redirect(`/question/${id}`);
    } catch (err) {
        renderErrorPage(res, err);
    }
});

router.post("/:id", async (req, res) => {
    try {
        const id = req.body.id;
        const vote = req.body.vote === "yes";
        await questionApi.voteFor(id, vote);
        res.redirect(`/question/${id}`);
    } catch (err) {
        renderErrorPage(res, err);
    }
});

export default router;