import {Document, model, Schema} from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    userAvatar: {type: String},
    title: {type: String}
});

export interface User extends Document {
    username: String;
    password: String;
    email: String;
    userAvatar?: String;
    title?: String;
}

const UserModel = model<User>("User", userSchema);

export default UserModel;