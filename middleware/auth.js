const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    // remove the "bearer prefix"
    const token = req.header("Authorization").split(" ")[1];

    
    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }
    
    try {
        // Verify the token

        const decoded = jwt.verify(token, process.env.SECRET);

        // Attach the user info to the request object
        req.user = {
            userId: decoded.id,
            role: decoded.role,
        };

        // Move to the next middleware/route
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = jwtAuthMiddleware;
