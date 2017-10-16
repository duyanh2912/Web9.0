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
exports.getQuestion = function (id) {
    return exports.getAllQuestion()[id];
};
var saveQuestions = function (questions) {
    var data = { questions: questions };
    var json = JSON.stringify(data, undefined, "  ");
    fs.writeFileSync(questionPath, json, "utf-8");
};
exports.addQuestion = function (content) {
    var questions = exports.getAllQuestion();
    var id = questions.length;
    var newQuestion = {
        content: content,
        yes: 0,
        no: 0,
        id: id
    };
    questions.push(newQuestion);
    saveQuestions(questions);
    return id;
};
exports.randomQuestion = function () {
    var questions = exports.getAllQuestion();
    var a = Math.random() * (questions.length - 1);
    var index = Math.round(a);
    return questions[index];
};
exports.voteFor = function (id, yes) {
    var questions = exports.getAllQuestion();
    yes ? questions[id].yes++ : questions[id].no++;
    saveQuestions(questions);
};
//# sourceMappingURL=question.js.map