const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Tweet = require("../models/tweet");
const users = require("./users")
const tweets = require("./tweets")
require("dotenv").config()

// Replace with your MongoDB connection string
const dbURI = process.env.MONGODB_URI;

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Hash passwords for users
        const hashedUsers = await Promise.all(users.map(async (user) => {
            user.password = await bcrypt.hash("password123", 10); // Replace with secure hash
            return user;
        }));

        // Insert users
        await User.deleteMany();
        const createdUsers = await User.insertMany(hashedUsers);
        console.log("Users seeded successfully");

        // Replace placeholder ownerIds with real user IDs
        const tweetsWithOwnerIds = tweets.map((tweet, index) => {
            tweet.ownerId = createdUsers[index % createdUsers.length]._id;
            tweet.comments.forEach(comment => {
                comment.ownerId = createdUsers[(index + 1) % createdUsers.length]._id;
            });
            return tweet;
        });

        // Insert tweets
        await Tweet.deleteMany();
        await Tweet.insertMany(tweetsWithOwnerIds);
        console.log("Tweets seeded successfully");

        // Close connection
        mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Run the script
seedDatabase();
