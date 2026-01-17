const express = require("express");
const User = require("../models/User");
const Query = require("../models/Query");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all-users", protect, async (req, res) => {
    try {
        const allUsers = await User.find();

        if (allUsers.length === 0) {
            return res.status(200).json({
                message: "No users found",
                allUsers: []
            });
        }

        res.status(200).json({
            message: "Users found",
            data: allUsers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get('/all-queries', protect, async (req, res) => {
    try {
        const allQueries = await Query.find();

        if (allQueries.length == 0) {
            return res.status(200).json({
                message: "No users found",
                allUsers: []
            });
        }

        res.status(200).json({
            message: "Queries Found",
            data: allQueries
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

module.exports = router;
