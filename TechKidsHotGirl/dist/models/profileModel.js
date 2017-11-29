"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userProfileSchema = new mongoose_1.Schema({
    profileName: { type: String },
    userAccess: {
        router: String,
        access: Boolean
    }
});
var ProfileModel = mongoose_1.model("Image", userProfileSchema);
exports.default = ProfileModel;
//# sourceMappingURL=profileModel.js.map