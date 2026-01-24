const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");
const { default: sendEmail } = require("../utils/sendEmail");
const User = require("../models/User");

const router = express.Router();

// POST: Create a new order
router.post("/", protect, async (req, res) => {
    try {
        const userId = req.user.id;
        const { size, quantity, name, phone, email, address, city, state, pin, note } = req.body;

        console.log(size, quantity, name, phone, email, address, city, state, pin, note)
        // Validation
        if (!size || !quantity || !name || !phone || !email || !address || !state || !city || !pin || !note) {
            console.log("All fiends rfkj")
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // if (phone.length != 10) {
        //     console.log("Error 2")
        //     return res.status(400).json({
        //         message: "Enter Valid Phone Number",
        //     })
        // }

        if (quantity < 100) {
            console.log("Error 3")
            return res.status(400).json({
                message: "Quantity Should be Greater than 100",
            })
        }

        const order = new Order({
            user: userId,
            size, quantity, name, phone, email, address, city, state, pin, note
        });

        await order.save();

        await User.findByIdAndUpdate(
            userId,
            { $push: { orders: order._id } },
            { new: true }
        )

        await sendEmail({
            to: order.email,
            subject: "Your Order Has Been Placed",
            html: `
                        <h2>Hello ${order.name},</h2>
                        <p>Thank you for ordering form AquaPure.</p>
                        <p>Your order has been Placed we will update you soon .</p>
                        <br />
                        <strong>Thank you!</strong>
                    `
        })

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