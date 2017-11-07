"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Schema.Types.ObjectId;
var imageSchema = new mongoose_1.Schema({
    imageUrl: { type: String, required: true },
    view: { type: Number, default: 0 },
    plus: { type: [ObjectId], default: [] },
    description: String,
    title: { type: String, required: true },
    poster: { type: ObjectId, ref: "users", required: true }
}, {
    timestamps: {
        createdAt: "date",
    },
});
var ImageModel = mongoose_1.model("Image", imageSchema);
exports.default = ImageModel;
//# sourceMappingURL=imageModel.js.map