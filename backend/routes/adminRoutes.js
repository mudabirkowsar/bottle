const express = require("express");
const User = require("../models/User");
const Query = require("../models/Query");
const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// Get all users for admin
router.get("/all-users", protect, async (req, res) => {
    try {
        const allUsers = await User.find();

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

// Get all Queries for admin 
router.get('/all-queries', protect, async (req, res) => {
    try {
        const allQueries = await Query.find();

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


// Get all Orders for Admin 
router.get('/all-orders', protect, async (req, res) => {
    try {
        const allOrders = await Order.find();

        res.status(200).json({
            message: "Orders Found",
            data: allOrders
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})


// Update status of Order 

router.put("/update-status/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true } // ✅ return updated document
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            data: order
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = router;
