import UserModel, {User} from "../models/userModel";

// Add new user
export const addUser = (user: User) => {
    return new UserModel(user).save();
};

// Get all users
export const getAllUsers = () => {
    return UserModel.find({});
};

// Get user by id
export const getUserById = (id: string) => {
    return UserModel.findById(id);
};