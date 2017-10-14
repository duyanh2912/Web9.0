import * as express from "express";
import * as parser from "body-parser";
import askRouter from "./routers/askRouter"
import questionRouter from "./routers/questionRouter"
import * as exhbs from "express-handlebars";
import {layoutsFolder, staticFolder, viewsFolder} from "./path";

let app = express();

// Config handlebars
app.engine("handlebars", exhbs({
    defaultLayout: "main",
    layoutsDir: layoutsFolder
}));
app.set("view engine", "handlebars");
app.set("views",viewsFolder);

// Middleware
app.use("/static",express.static(staticFolder));
app.use(parser.urlencoded({extended: true}));

// Router
app.get("/", (req, res) => res.render("home"));
app.get("/about", (req,res) => res.render("about",{
    cssPath: "/static/css/about.css"
}));
app.use("/ask", askRouter);
app.use("/question", questionRouter);

// Port
app.listen(6969, (err: string) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Website is up at 6969");
    }
});