import mongoose from "mongoose";

// Create a schema for the user model
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "User Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;

// { name: 'John Doe', email: 'john@doe', password: 'password123' }