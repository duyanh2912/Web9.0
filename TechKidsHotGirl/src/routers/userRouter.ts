import {Router} from "express";
import {addUser, getAllUsers, getUserById} from "../controllers/userController";

let userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).send({
            users
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

userRouter.get("/:id", async (req,res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

userRouter.post("/", async (req, res) => {
    try {
        await addUser(req.body);
        res.status(200).send({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err.message
        });
    }
});

export default userRouter;