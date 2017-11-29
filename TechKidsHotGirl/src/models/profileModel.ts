import {Document, model, Schema} from "mongoose";

const userProfileSchema = new Schema({
    profileName: {type: String},
    userAccess: {
        router: String,
        access: Boolean
    }
});

export interface UserProfile extends Document {
    profileName: string;
    userAccess: {
        router: string;
        access: boolean;
    };
}

const ProfileModel = model<UserProfile>("Image", userProfileSchema);

export default ProfileModel;