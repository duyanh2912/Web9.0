"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../path");
var fs = require("fs");
var node_uuid_1 = require("node-uuid");
var questionPath = path_1.dataFolder + "question.json";
var loadData = function () {
    var data = { allIds: [], byId: {} };
    try {
        var raw = fs.readFileSync(questionPath, "utf-8");
        data = JSON.parse(raw);
    }
    catch (err) {
        console.log(err);
    }
    return data;
};
exports.getAllQuestion = function () {
    var data = loadData();
    return data.allIds.map(function (id) { return data.byId[id]; });
};
exports.getQuestion = function (id) {
    return loadData().byId[id];
};
var saveData = function (data) {
    var json = JSON.stringify(data, undefined, "  ");
    fs.writeFileSync(questionPath, json, "utf-8");
};
exports.addQuestion = function (content) {
    var data = loadData();
    var id = node_uuid_1.v4();
    var newQuestion = {
        content: content,
        yes: 0,
        no: 0,
        id: id
    };
    data.allIds.push(id);
    data.byId[id] = newQuestion;
    saveData(data);
    return id;
};
exports.randomQuestion = function () {
    var _a = loadData(), allIds = _a.allIds, byId = _a.byId;
    var rand = Math.floor(Math.random() * (allIds.length));
    if (rand > allIds.length - 1)
        rand = allIds.length - 1;
    var id = allIds[rand];
    return byId[id];
};
exports.voteFor = function (id, yes) {
    var data = loadData();
    if (data.byId[id]) {
        var question = data.byId[id];
        yes ? question.yes++ : question.no++;
        saveData(data);
    }
};
//# sourceMappingURL=question.js.map