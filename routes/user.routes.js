import { Router } from "express";

const userRouter = Router();

//GET /users -> get all users
//GET /users/:id -> get user by id // 123 456 789


userRouter.get('/', (req,res) => {
    res.send({title: 'GET all users'});
})

userRouter.get('/:id', (req,res) => {
    res.send({title: 'GET user details'});
})

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