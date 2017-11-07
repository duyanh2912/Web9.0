"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../path");
var fs = require("fs");
var path = require("path");
var dataPath = path.join(path_1.dataFolder, "data.json");
var data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
exports.getTestData = function () {
    return data;
};
exports.checkAnswers = function (answers) {
    // TODO: return test score based on user answer
    var score = 0;
    for (var questionKey in answers) {
        if (!answers.hasOwnProperty(questionKey))
            return;
        var questionId = parseInt(questionKey.split("_")[1]);
        if (parseInt(answers[questionKey]) === data.questions[questionId].correct) {
            score += 1;
        }
    }
    return score;
};
exports.getCorrectAnswers = function () {
    return data.questions.map(function (question) { return ({
        id: question.id,
        correct: question.correct
    }); });
};
//# sourceMappingURL=testController.js.map