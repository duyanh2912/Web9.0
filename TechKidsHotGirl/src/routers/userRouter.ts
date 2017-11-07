import {Router} from "express";
import {addUser, getAllUsers} from "../controllers/userController";

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

userRouter.post("/", async (req,res) => {
    try {
        const body = req.body;
        const user = await addUser(body);
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

export default userRouter;