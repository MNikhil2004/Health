const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");

            req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Not authorized as admin" });
    }
};

module.exports = { protect, isAdmin };
