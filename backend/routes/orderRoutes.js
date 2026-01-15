const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// POST: Create a new order
router.post("/",protect, async (req, res) => {
    try {
        const { size, quantity, name, phone, email, address, note } = req.body;

        // Validation
        if (!size || !quantity || !name || !phone || !email || !address || !note) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const order = new Order({
            size, quantity, name, phone, email, address, note
        });

        await order.save();

        res.status(201).json({
            message: "Order Placed Successfully",
            order: order
        });

    } catch (error) {
        console.error(error.message); // Log error for debugging
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// GET: Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        // Changed 201 to 200 (OK)
        res.status(200).json({
            data: orders,
            message: "Orders Found",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;