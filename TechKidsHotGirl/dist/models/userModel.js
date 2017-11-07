"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userAvatar: { type: String },
    title: { type: String }
});
var UserModel = mongoose_1.model("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map