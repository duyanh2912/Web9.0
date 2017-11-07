"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userModel_1 = require("../models/userModel");
// Add new user
exports.addUser = function (user) {
    return new userModel_1.default(user).save();
};
// Get all users
exports.getAllUsers = function () {
    return userModel_1.default.find({});
};
// Get user by id
exports.getUserById = function (id) {
    return userModel_1.default.findById(id);
};
//# sourceMappingURL=userController.js.map