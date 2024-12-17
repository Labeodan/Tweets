const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const authRouter = require("./controllers/users")
const tweetRouter = require("./controllers/tweets")
const rfs = require("rotating-file-stream");
const path = require("path")
const rateLimit = require("express-rate-limit")


// setting up log rotation
const logStream = rfs.createStream("access.log", {
    interval: "1d", // Rotate daily
    path: path.join(__dirname, "logs"), // Directory to save logs
    maxFiles: 7, // Keep logs for the last 7 days
});


//! Middleware
app.use(morgan("dev", { stream: process.stdout })); // Log to terminal
app.use(morgan("combined", { stream: logStream }));
app.use(express.json())


// Setting up Rate Limiting


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