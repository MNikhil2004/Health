const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this model exists
const { protect, isAdmin } = require("../middlewares/auth"); // Import middleware

// ✅ Get all users (Admin Only)
router.get("/admin/users", protect, isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, "username email role createdAt");
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
