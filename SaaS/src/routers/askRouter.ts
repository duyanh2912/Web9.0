import * as express from "express";

const router = express.Router();

router.get("/", (req,res) => {
    res.render("ask",{
        cssPath: "/static/css/ask.css"
    });
});

export default router;