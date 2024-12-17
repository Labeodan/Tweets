const users = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "$2b$10$AHashedPassword1", // Replace with hashed password using bcrypt
        country: "Nigeria",
        role: "user",
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "$2b$10$AHashedPassword2", // Replace with hashed password using bcrypt
        country: "Nigeria",
        role: "admin",
    },
    {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        password: "$2b$10$AHashedPassword3",
        country: "Nigeria",
        role: "user",
    },
    {
        firstName: "Bob",
        lastName: "Williams",
        email: "bob.williams@example.com",
        password: "$2b$10$AHashedPassword4",
        country: "Nigeria",
        role: "user",
    },
];

module.exports = users