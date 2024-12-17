const express = require("express");
const router = express.Router();
const Tweet = require("../models/tweet");
const jwtAuthMiddleware = require("../middleware/auth");
const mongoose = require("mongoose");

// Middleware for Authorization
const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied" });
    }
    next();
};


// TWEET CRUD ROUTES


//  Create a Tweet
router.post("/", jwtAuthMiddleware, async (req, res) => {
    try {
        const { tweet } = req.body;
        console.log(req.user)

        const newTweet = await Tweet.create({
            ownerId: req.user.userId,
            tweet,
        });

        return res.status(201).json({ msg: "Tweet created successfully", newTweet });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ msg: messages[0] }); 
        }
    
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// Get All Tweets
router.get("/", jwtAuthMiddleware, async (req, res) => {
    try {
        const tweets = await Tweet.find();
        return res.status(200).json({ tweets });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// Get a Specific Tweet
router.get("/:id", jwtAuthMiddleware, async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            return res.status(404).json({ msg: "Tweet not found" });
        }

        return res.status(200).json({ tweet });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// Update a Tweet
router.put("/:id", jwtAuthMiddleware, async (req, res) => {
    try {
        const { tweet } = req.body;

        const existingTweet = await Tweet.findById(req.params.id);

        if (!existingTweet) {
            return res.status(404).json({ msg: "Tweet not found" });
        }

        // Authorization: Check if user owns the tweet
        if (existingTweet.ownerId.toString() !== req.user.userId) {
            return res.status(403).json({ msg: "You are not authorized to edit this tweet" });
        }

        existingTweet.tweet = tweet || existingTweet.tweet;
        await existingTweet.save();

        return res.status(200).json({ msg: "Tweet updated successfully", existingTweet });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// Delete a Tweet
router.delete("/:id", jwtAuthMiddleware, async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            return res.status(404).json({ msg: "Tweet not found" });
        }

        // Authorization: User can delete own tweet, Admin can delete any tweet
        if (tweet.ownerId.toString() !== req.user.userId && req.user.role !== "admin") {
            return res.status(403).json({ msg: "You are not authorized to delete this tweet" });
        }

        await tweet.deleteOne();
        return res.status(200).json({ msg: "Tweet deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});


// COMMENT ROUTES


// Add a Comment to a Tweet
router.post("/:id/comments", jwtAuthMiddleware, async (req, res) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.status(400).json({ msg: "Comment content is required" });
        }

        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) {
            return res.status(404).json({ msg: "Tweet not found" });
        }

        const comment = {
            ownerId: req.user.userId,
            description,
        };

        tweet.comments.push(comment);
        await tweet.save();

        return res.status(201).json({ msg: "Comment added successfully", tweet });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

// Delete a Comment
router.delete("/:tweetId/comments/:commentId", jwtAuthMiddleware, async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.tweetId);

        if (!tweet) {
            return res.status(404).json({ msg: "Tweet not found" });
        }

        const comment = tweet.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        // Authorization: User can delete their own comment, tweet owner can delete comments, Admin can delete any comment
        if (
            comment.ownerId.toString() !== req.user.userId &&
            tweet.ownerId.toString() !== req.user.userId &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ msg: "You are not authorized to delete this comment" });
        }

        comment.deleteOne();
        await tweet.save();

        return res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = router;
