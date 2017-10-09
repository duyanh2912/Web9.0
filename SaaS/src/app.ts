import express = require("express");
import path = require("path");

let app = express();

app.use(express.static(path.join(__dirname,"../public")));

app.listen(6969, (err: string) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Website is up.");
    }
});