"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var questionSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});
var Question = mongoose_1.model("Question", questionSchema);
exports.default = Question;
//# sourceMappingURL=questionModel.js.map