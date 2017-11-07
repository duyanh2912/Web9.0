"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../path");
var fs = require("fs");
var path = require("path");
var dataPath = path.join(path_1.dataFolder, "data.json");
var getTestDatas = function () {
    return fs.readFileSync(dataPath, "utf-8");
};
var checkAnswers = function (answer) {
    // TODO: return test score based on user answer
};
//# sourceMappingURL=test-data.js.map