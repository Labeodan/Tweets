const tweets = [
    {
        ownerId: "6123456789abcdef12345678", // Replace with ObjectId of a user
        tweet: "Just had a great day at work! 🚀",
        comments: [
            {
                ownerId: "6123456789abcdef12345679", // Replace with another user's ID
                description: "That's awesome! Keep it up.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ownerId: "6123456789abcdef12345680",
                description: "Glad to hear that. Work-life balance is key.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345679",
        tweet: "Learning Node.js and loving it so far! 💻",
        comments: [
            {
                ownerId: "6123456789abcdef12345678",
                description: "Node.js is great! Check out Express for web apps.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345680",
        tweet: "The new Spider-Man movie was amazing! 🕷️🍿",
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345681",
        tweet: "Starting my fitness journey today! 💪 #Day1",
        comments: [
            {
                ownerId: "6123456789abcdef12345678",
                description: "You've got this! Consistency is key.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ownerId: "6123456789abcdef12345679",
                description: "Good luck! Health is wealth.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345682",
        tweet: "Exploring the great outdoors this weekend. Nature is therapy! 🌲🏕️",
        comments: [
            {
                ownerId: "6123456789abcdef12345680",
                description: "Absolutely! Fresh air works wonders.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ownerId: "6123456789abcdef12345678",
                description: "Take some good photos. Enjoy the trip!",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345683",
        tweet: "Coffee and coding late into the night. Debugging feels like therapy sometimes! ☕💻",
        comments: [
            {
                ownerId: "6123456789abcdef12345679",
                description: "Debugging at 3 AM hits different! 😂",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345684",
        tweet: "Happy to announce I just landed my dream job as a full-stack developer! 🎉🚀",
        comments: [
            {
                ownerId: "6123456789abcdef12345681",
                description: "Congrats! Well deserved.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ownerId: "6123456789abcdef12345682",
                description: "Hard work pays off! Enjoy the new role.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345685",
        tweet: "Anyone else addicted to reading books lately? Just finished Atomic Habits, and it's a game changer. 📚✨",
        comments: [
            {
                ownerId: "6123456789abcdef12345678",
                description: "Atomic Habits is gold! Next, try 'Deep Work' by Cal Newport.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ownerId: "6123456789abcdef12345680",
                description: "I've been meaning to read that. Adding it to my list!",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345686",
        tweet: "AI is changing the world, and it's exciting to be part of this journey. 🤖💡 #Tech",
        comments: [
            {
                ownerId: "6123456789abcdef12345682",
                description: "AI is fascinating! The future is here.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345687",
        tweet: "Is it just me, or do weekends fly by way too fast? 😅 #WeekendVibes",
        comments: [
            {
                ownerId: "6123456789abcdef12345681",
                description: "So true! Monday comes way too quickly.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        ownerId: "6123456789abcdef12345688",
        tweet: "Just hit 100 days of my coding challenge! Consistency is everything. 🏆💻",
        comments: [
            {
                ownerId: "6123456789abcdef12345679",
                description: "Congrats! Keep pushing forward.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                ownerId: "6123456789abcdef12345684",
                description: "That's incredible! 100 days is no small feat.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

module.exports = tweets