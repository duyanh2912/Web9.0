import UserModel, {User} from "../models/userModel";
import * as bcrypt from "bcrypt";

// Add new user
export const addUser = async (user: User) => {
    const hash = await bcrypt.hash(user.password, 10);
    const newUser: Partial<User> = {
        username: user.username,
        password: hash,
        email: user.email,
    };

    await new UserModel(newUser as User).save();
};

// Get all users
export const getAllUsers = () => {
    return UserModel.find({}).select("-password").exec();
};

// Get user by id
export const getUserById = (id: string) => {
    return UserModel.findById(id).select("-password").exec();
};
