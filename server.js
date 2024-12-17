const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const authRouter = require("./controllers/users")
const tweetRouter = require("./controllers/tweets")




//! Middleware
app.use(morgan("dev"))
app.use(express.json())


// !Routes
app.use("/auth", authRouter)
app.use("/tweets", tweetRouter)

  







// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`Connected to ${mongoose.connection.name}`);

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Error starting server:", error.message);
        process.exit(1);
    }
}

startServer()