import {Document, model, Schema} from "mongoose";

const questionSchema = new Schema({
    content: {type: String, required: true},
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0}
});

interface IQuestion extends Document {
    content: string;
    yes: number;
    no: number;
}

const Question = model<IQuestion>("Question",questionSchema);

export default Question;