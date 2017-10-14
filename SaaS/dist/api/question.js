"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../path");
var fs = require("fs");
var questionPath = path_1.dataFolder + "question.json";
exports.getAllQuestion = function () {
    var data = { questions: [] };
    try {
        data = JSON.parse(fs.readFileSync(questionPath, "utf-8"));
    }
    catch (err) {
        console.log(err);
    }
    if (!data.questions || !data.questions.length)
        return [];
    return data.questions;
};
var saveQuestions = function (questions) {
    var data = { questions: questions };
    var json = JSON.stringify(data, undefined, "  ");
    fs.writeFileSync(questionPath, json, "utf-8");
};
exports.addQuestion = function (content) {
    var questions = exports.getAllQuestion();
    var newQuestion = {
        content: content,
        yes: 0,
        no: 0,
        id: questions.length
    };
    questions.push(newQuestion);
    saveQuestions(questions);
};
exports.randomQuestion = function () {
    var questions = exports.getAllQuestion();
    var a = Math.random() * (questions.length - 1);
    var index = Math.round(a);
    return questions[index];
};
//# sourceMappingURL=question.js.map