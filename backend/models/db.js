const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/business");
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
