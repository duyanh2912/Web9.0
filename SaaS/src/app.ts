import express = require("express");
import path = require("path");

let app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/style.css"));
});

app.listen(6969, (err: string) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Website is up.");
    }
});