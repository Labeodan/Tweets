const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    lastName : {type: String, required: [true, "Lastname is required"]},
    firstName : {type: String, required: [true, "Firstname is required"]},
    email: {
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true
    },
    country: {type: String, required: [true, "Country is required"]},
    password: {
        type: String, 
        required: [true, "Password is required"], 
        minlength: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User