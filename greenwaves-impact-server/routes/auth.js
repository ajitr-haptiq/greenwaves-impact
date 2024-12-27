const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/auth");
// const { rawListeners } = require("../models/auth");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role = "user" } = req.body;

    //for empty role default is user
    const validRole = role.trim() === "" ? "user" : role;
    console.log(validRole, ">>>>>>>>>>>");

    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .send({ message: "Password must be at least 8 characters." });
    }

    const allowedRoles = ["admin", "user"];
    // Check if the role is valid
    if (!allowedRoles.includes(validRole)) {
      return res.status(400).send({ message: "Invalid role." });
    }

    //user validation
    const hashPassword = await bcrypt.hash(password, 10);
    //using validRole for the default user role
    const user = new User({
      username,
      email,
      password: hashPassword,
      validRole,
    });

    const result = await user.save();
    console.log("result", result);
    res.status(201).send({ message: "User Registered." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "Registration Failed." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Credentials...." });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT secret is missing.");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send({ message: "Login Failed. Please try again." });
  }
});

module.exports = router;
