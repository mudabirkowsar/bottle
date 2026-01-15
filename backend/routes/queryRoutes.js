const express = require("express");
const Query = require("../models/Query");
const protect = require("../middleware/authMiddleware");

const router = express.Router()

router.post("/", protect, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body
        if (!name || !email || !phone || !message) {
            return res.status(404).json({
                message: "All fields are required"
            })
        }

        const query = new Query({
            name, email, phone, message
        })

        await query.save();

        res.status(201).json({
            message: "Query submitted Successfully ",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

router.get("/", async (req, res) => {
    try {
        const queries = Query.find();
        res.status(201).json({
            message: "Queries Found",
            data: queries
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

module.exports = router