import * as express from "express";
import * as parser from "body-parser";
import * as mongoose from "mongoose";
import imageRouter from "./routers/imageRouter";
import userRouter from "./routers/userRouter";

let app = express();

// Middleware
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

// Router
app.use("/api/images",imageRouter);
app.use("/api/users",userRouter);

// Database
mongoose.connect("mongodb://localhost/TechKidsHotGirl", {
    useMongoClient: true
}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("connect db success");
});

// Port
app.listen(6969, (err: string) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Website is up at 6969");
    }
});
