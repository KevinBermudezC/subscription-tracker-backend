import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

//GET /users -> get all users
//GET /users/:id -> get user by id // 123 456 789


userRouter.get('/',getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.post('/', (req,res) => {
    res.send({title: 'CREATE new users'});
})

userRouter.put('/:id', (req,res) => {
    res.send({title: 'UPDATE user by id'});
})

userRouter.delete('/:id', (req,res) => {
    res.send({title: 'DELETE user by id'});
})

export default userRouter;