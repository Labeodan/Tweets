const express = require("express")
const router = express.Router()
const User = require("../models/user")
const validator = require("validator")
const countries = require('countries-list');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ! Routes

// Signup 
router.post("/signup", async (req, res) => {
    try {
        const {lastname, firstname, email, country, password, confirmPassword} = req.body
        // check is passwords match
        if (password !== confirmPassword){
            return res.status(400).json({msg: "Passwords do not match"})
        }
        // hash password
        const hashedPassword = bcrypt.hashSync(password, 10)
        req.body.password = hashedPassword

        // Validate country
        if (!Object.values(countries.countries).some(
            (countryObj) => countryObj.name.toUpperCase() === country.toUpperCase()
        )) {
            return res.status(400).json({ msg: "Enter a valid country name" });
        }

        // validate email
        if (!validator.isEmail(email)){
            return res.status(400).json({msg: "Enter a valid email"})
        }

        // check if email already exists in db
        const userInDb = await User.findOne({email: email})
        if (userInDb) {
            return res.status(400).json({msg: "User with this email already exists"})
        }
        

        // create user
        const user = await User.create(req.body)


        // create token
        const payload = {
            email: email,
            id: user._id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "24h"})


        // send user and token as response.
    
        return res.status(201).json({token: token, user})
        
    } catch (error) {

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ msg: messages[0] }); 
        }
    
        return res.status(500).json({ msg: "Internal server error" });
    }
})  



router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ msg: "Password is required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: "Enter a valid email" });
        }

        // Check if user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Create token
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });

        // Send user and token as response
        return res.status(200).json({ msg: "Signin successful", token, user });
    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({ msg: "Internal server error" });
    }
});





module.exports = router
