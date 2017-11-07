import {Router} from "express";
import {addImage, getAllImages, getImageById} from "../controllers/imageController";

const imageRouter = Router();

imageRouter.get("/", async (req, res) => {
    try {
        const images = await getAllImages();
        res.status(200).send({
            images
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

imageRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const image = await getImageById(id);
        res.status(200).send(image);
    } catch (err) {
        console.log(err);
        res.status(404).send("Invalid id.");
    }
});

imageRouter.post("/", async (req, res) => {
    const body = req.body;
    try {
        let image = await addImage(body);
        res.status(200).send(image);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

export default imageRouter;