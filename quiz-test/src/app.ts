import * as express from "express";
import * as parser from "body-parser";
import * as exhbs from "express-handlebars";
import {layoutsFolder, staticFolder, viewsFolder} from "./path";
import {checkAnswers, getCorrectAnswers, getTestData} from "./controllers/testController";

let app = express();

// Config handlebars
app.engine("handlebars", exhbs({
    defaultLayout: "main",
    layoutsDir: layoutsFolder
}));
app.set("view engine", "handlebars");
app.set("views", viewsFolder);

// Middleware
app.use("/static", express.static(staticFolder));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

// Router
app.get("/", (req, res) => {
    res.render("test", {
        testData: getTestData()
    });
});

app.post("/answer", (req, res) => {
    res.render("result", {
        result: checkAnswers(req.body.params)
    });
});

app.post("/api/answer", (req, res) => {
    res.send({
        score: checkAnswers(req.body),
        answers: getCorrectAnswers()
    });
});

// Port
app.listen(6969, (err: string) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Website is up at 6969");
    }
});
