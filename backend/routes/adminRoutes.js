const express = require("express");
const User = require("../models/User");
const Query = require("../models/Query");
const protect = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const { default: sendEmail } = require("../utils/sendEmail");

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
        const pendingQueries = allQueries.filter(
            (q) => q.status === "pending"
        );

        res.status(200).json({
            message: "Queries Found",
            data: allQueries,
            pending: pendingQueries
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
router.put("/update-order-status/:id", protect, async (req, res) => {
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

        if (status == "viewed") {
            await sendEmail({
                to: order.email,
                subject: "Your Order Has Been Viewed",
                html: `
                <h2>Hello ${order.name},</h2>
                <p>Thank you for ordering form AquaPure.</p>
                <p>Your order has been Viewed.</p>
                <br />
                <strong>Thank you!</strong>
            `
            })
        }

        if (status == "delivered") {
            await sendEmail({
                to: order.email,
                subject: "Your Order Has Been Delivered",
                html: `
                <h2>Hello ${order.name},</h2>
                <p>Thank you for ordering form AquaPure.</p>
                <p>Your order has been Delivered.</p>
                <br />
                <strong>Thank you!</strong>
            `
            })
        }

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

//Update status of Order 
router.put('/update-query-status/:id', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const order = await Query.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (status === "resolved") {
            await sendEmail({
                to: order.email,
                subject: "Your Query Has Been Resolved",
                html: `
                <h2>Hello ${order.name},</h2>
                <p>We will try our best to reach you out for your query.</p>
                <p>If you have more questions, feel free to contact us.</p>
                <br />
                <strong>Thank you!</strong>
            `
            });
        }

        if (!order) {
            return res.status(404).json({
                message: "Query not found"
            });
        }

        res.status(200).json({
            message: "Query status updated successfully",
            data: order
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

//Update User
router.put("/update-user/:id", protect, async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.body

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        )

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied"
            });
        }


        if (!user) {
            return res.status(404).json({
                message: "User not Found "
            })
        }

        res.status(200).json({
            message: "User Updated Successfully",
            user,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error"
        })
    }
})

// Delete user 
router.delete('/delete-user/:id', protect, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.log("User not found")
            res.status(404).json({
                message: "User not found",
            })
        }

        console.log("User deleted 6")
        res.status(200).json({
            message: "User Deleted successfully"
        })
    } catch (error) {
        console.log("Error in delete ")
        res.status(500).json({
            message: "Something went wrong"
        })
    }

})

// Delete Query 
router.delete('/delete-query/:id', protect, async (req, res) => {
    console.log(req.params.id)
    try {
        const query = await Query.findByIdAndDelete(req.params.id)

        if (!query) {
            res.status(404).json({
                message: "Query not found"
            })
        }

        res.status(200).json({
            message: "Query deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Error "
        })
    }
})


module.exports = router;
