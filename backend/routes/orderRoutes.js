const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { size, quantity, name, phone, email, address, note } = req.body
        if (!size || !quantity || !name || !phone || !email || !address || !note) {
            return res.status(404).json({
                message: "All fields are required"
            })
        }

        const order = new Order({
            size, quantity, name, phone, email, address, note
        })

        await order.save();

        res.status(201).json({
            message: "Order Placed Successfully",
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})


router.get('/', async(req, res) => {
    try {
        const orders = await Order.find();
        res.status(201).json({
            data: orders,
            message: "Orders Found",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

module.exports = router