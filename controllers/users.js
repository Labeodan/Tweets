const express = require("express")
const router = express.Router()
const User = require("../models/user")

// ! Routes

// Signup 
router.post("/signup", (req, res) => {
    res.send("Signup Route")
})  





router.post("/signin", (req, res) => {
    res.send("Signin Route")
})  



module.exports = router
