const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, required: true},
    description: {
        type: String,
        required: [true, 'Comment content is required'],
        maxlength: [300, 'Comment cannot be more than 300 characters'],
        trim: true,
    }
    
}, { timestamps: true })

const tweetSchema = new mongoose.Schema({
    ownerId: {type: mongoose.Schema.Types.ObjectId, required: true},
    tweet: {
        type: String,
        required: [true, 'Tweet content is required'],
        maxlength: [1000, 'Tweet cannot be more than 1000 characters'],
        trim: true,
    },
    comments: [commentSchema],
}, { timestamps: true })

const Tweet = mongoose.model("Tweet", tweetSchema)

module.exports = Tweet