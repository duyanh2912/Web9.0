import {default as ImageModel, Image} from "../models/imageModel";
import {getUserById} from "./userController";

// Create Image
export const addImage = async (image: Partial<Image>) => {
    // Check for existence of poster
    const user = await getUserById(image.poster as string);
    if (!user) {
        throw new Error("Invalid poster id.");
    }

    // Filter out accepted field
    const controlledImage: Partial<Image> = {
        imageUrl: image.imageUrl,
        description: image.description,
        title: image.title,
        poster: image.poster
    };

    const imageDoc = new ImageModel(controlledImage as Image);
    return imageDoc.save();
};

// Get All Image
export const getAllImages = () => {
    return ImageModel.find({}).populate("poster","-password").exec();
};

// Get Image By Id
export const getImageById = (id: string) => {
    return ImageModel.findById(id).populate("poster","-password").exec();
};

// Increase view count
export const increaseViewCount = (imageId: string) => {
    return ImageModel.findById(imageId).exec().then(doc => {
        doc!.view++;
        doc!.save();
    });
};

// Like increment
export const increaseImageLikes = async (imageId: string, userId: string) => {
    // Check for existence of user
    const user = await getUserById(userId);
    if (!user) {
        throw new Error("Invalid poster id.");
    }

    return ImageModel.findById(imageId).exec().then(doc => {
        doc!.plus.push(userId);
        return doc!.save();
    });
};