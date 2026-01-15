const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Please login" });
    }

    try {
        const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT ERROR:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;
