import {Document, model, Schema} from "mongoose";
import {User} from "./userModel";

const ObjectId = Schema.Types.ObjectId;

const imageSchema = new Schema({
    imageUrl: {type: String, required: true},
    view: {type: Number, default: 0},
    plus: {type: [ObjectId], default: []},
    description: String,
    title: {type: String, required: true},
    poster: {type: ObjectId, ref: "users", required: true}
}, {
    timestamps: {
        createdAt: "date",
    },
});

export interface Image extends Document {
    imageUrl: string;
    view: number;
    plus: string[];
    description?: string;
    title: string;
    poster: string | User;

    date: Date;
}

const ImageModel = model<Image>("Image", imageSchema);

export default ImageModel;