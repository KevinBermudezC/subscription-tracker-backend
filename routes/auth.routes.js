import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

//PATH = /api/v1/auth/sign-up -> POST BODY -> {name,email,password} -> CREATES A NEW USER
authRouter.post('/sign-up',signUp);

//PATH = /api/v1/auth/sign-in -> POST BODY -> {email,password} -> SIGN IN A USER
authRouter.post('/sign-in',signIn);

//PATH = /api/v1/auth/sign-out -> POST
authRouter.post('/sign-out',signOut);

export default authRouter;