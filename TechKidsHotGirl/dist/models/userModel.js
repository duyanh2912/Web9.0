"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validateEmail = function (email) {
    var pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return pattern.test(email);
};
var userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, validate: {
            validator: validateEmail,
            msg: "{VALUE} is not a valid email!"
        },
    },
    userAvatar: { type: String },
    title: { type: String }
});
var UserModel = mongoose_1.model("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map