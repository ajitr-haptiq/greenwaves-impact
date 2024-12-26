const mongoose = require("mongoose");

require("dotenv").config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/greeenwaves-impact"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
