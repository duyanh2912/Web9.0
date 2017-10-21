import {model, Schema} from "mongoose";

const questionSchema = new Schema({
    content: {type: String, required: true},
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0}
});

const Question = model("Question",questionSchema);

export default Question;