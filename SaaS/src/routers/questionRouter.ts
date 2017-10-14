import * as express from "express";
import * as questionApi from "../api/question"

const router = express.Router();

router.get("/",(req,res) => {
    const { content: question, yes, no } = questionApi.randomQuestion();
    res.render("question", {
        question,
        yes,
        no,
    })
});

router.get("/:id",(req,res) => {
    console.log(req.query);
    res.send(req.params);
});

router.post("/",(req,res)=> {
    questionApi.addQuestion(req.body.question);
    res.redirect("/ask");
});

export default router;