import {Document, model, Schema} from "mongoose";

const validateEmail = (email: string): Boolean => {
    const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return pattern.test(email);
};

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {
        type: String, required: true, unique: true, validate: {
            validator: validateEmail,
            msg: "{VALUE} is not a valid email!"
        },
    },
    userAvatar: {type: String},
    title: {type: String}
});

export interface User extends Document {
    username: string;
    password: string;
    email: string;
    userAvatar?: string;
    title?: string;
}

const UserModel = model<User>("User", userSchema);

export default UserModel;