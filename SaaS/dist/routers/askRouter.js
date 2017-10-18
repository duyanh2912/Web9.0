"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get("/", function (req, res) {
    res.render("ask", {
        cssPath: "/static/css/ask.css"
    });
});
exports.default = router;
//# sourceMappingURL=askRouter.js.map