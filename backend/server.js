const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/yourdbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", authRoutes); // Include auth and admin routes
// app.use("/api", adminRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
