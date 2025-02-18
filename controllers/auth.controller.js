import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
//What is a req body -> req.body is an object containing data that comes from the client to the server. (POST request)

export const signUp = async (req, res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //Create a new user
        const { name, email, password } = req.body;
        //check if a user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a new user
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(
            { 
                success: true,
                message: 'User created successfully',
                data: {
                    token,
                    user: newUser[0],
                },
                
            }
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

};

export const signIn = async (req, res,next) => {
    //implement sign in logic
    try {
        const {email,password} = req.body;
        //check if a user exists
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        //check if the password is valid
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        //generate a token
        const token = jwt.sign({userId: user._id},JWT_SECRET,{expiresIn: JWT_EXPIRES_IN});

        //send the response
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user,
            }
        });

    } catch (error) {
        //send the error to the error handler
        next(error);
    }
};

export const signOut = async (req, res,next) => {
    //implement sign out logic
    try {
        //send the response
        res.status(200).json({
            success: true,
            message: 'User signed out successfully',
        });
    } catch (error) {
        //send the error to the error handler
        next(error);
    }
};