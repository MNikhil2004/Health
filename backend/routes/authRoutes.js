// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {protect,isAdmin} = require("../middlewares/authMiddleware.js")
// const User = require("../models/User");


// const router = express.Router();
// const SECRET_KEY = "your_secret_key"; // Change this to a strong secret key

// // Register Route
// router.post("/register", async (req, res) => {
//   const { username, email, password, role } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword, role });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login Route (Fixing JWT Issue)
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       SECRET_KEY,
//       { expiresIn: "1h" } // Token expires in 1 hour
//     );

//     res.json({ message: "Login successful", token, role: user.role });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/users", protect, isAdmin, async (req, res) => {
//     try {
//       const users = await User.find({}, "username email role createdAt"); // Select required fields
//       res.json(users);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching users" });
//     }
//   });
  
//   // ✅ Delete a user (Only Admins)
//   router.delete("/users/:id", protect, isAdmin, async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       await user.deleteOne(); // Remove user
//       res.json({ message: "User removed successfully" });
//     } catch (error) {
//       res.status(500).json({ message: "Error deleting user" });
//     }
//   });
  

// module.exports = router;


const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");
const User = require("../models/User");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Secure the secret key

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fix: Admin Route should be `/api/admin/users`
router.get("/admin/users", protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "username email role createdAt");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Delete a user (Admin only)
router.delete("/admin/users/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
