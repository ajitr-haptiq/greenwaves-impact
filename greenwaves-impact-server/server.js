const express = require("express");
const connectMongoDB = require("./config/db");
const auth = require("./routes/auth");
const cors = require("cors"); // Enable CORS for frontend requests
const app = express();
require("dotenv").config();

// Middlewares
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Routes
app.use("/api/auth", auth);

// Connect to MongoDB
connectMongoDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
