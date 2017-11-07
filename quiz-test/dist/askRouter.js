"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var router = express.Router();
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ask/index.html"));
});
exports.default = router;
//# sourceMappingURL=askRouter.js.map