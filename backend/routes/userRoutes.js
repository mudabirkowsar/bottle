const express = require('express')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const protect = require("../middleware/authMiddleware");

const User = require('../models/User')
const { default: sendEmail } = require('../utils/sendEmail')

const router = express.Router()

//Create User
router.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        }

        const existedUser = await User.findOne({ email: email.toLowerCase() });

        const hashedOtp = await bcrypt.hash(otp, 10);

        if (existedUser) {
            if (existedUser.isEmailVerified === true) {
                return res.status(409).json({
                    message: "Email already registered",
                });
            }

            // Resend OTP
            await User.updateOne(
                { _id: existedUser._id },
                {
                    $set: {
                        otp: hashedOtp,
                        otpExpiresAt: Date.now() + 5 * 60 * 1000,
                    },
                }
            );

            await sendEmail({
                to: email,
                subject: "Your OTP for Signup Verification",
                html: `<h1>${otp}</h1><p>OTP valid for 5 minutes</p>`,
            });

            return res.status(200).json({
                message: "OTP resent. Please verify your email.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            otp: hashedOtp,
            otpExpiresAt: Date.now() + 5 * 60 * 1000,
            isEmailVerified: false,
        });

        await sendEmail({
            to: email,
            subject: "Your OTP for Signup Verification",
            html: `<h1>${otp}</h1><p>OTP valid for 5 minutes</p>`,
        });

        res.status(201).json({
            message: "User registered. Please verify your email.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//Login user
router.post('/login-user', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const existedUser = await User.findOne({ email });
        if (!existedUser) {
            return res.status(500).json({
                message: "User not found"
            })
        }

        if (existedUser.isEmailVerified == false) {
            return res.status(400).json({
                message: "Your Email is Not verified Please signup to verify"
            })
        }

        const userMatch = await bcrypt.compare(password, existedUser.password)

        if (!userMatch) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }

        const token = jwt.sign(
            {
                id: existedUser._id,
                name: existedUser.name,
                role: existedUser.role,
                email: existedUser.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            message: "Login successfully",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

//VerifyOTP
router.post('/verify-email', async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                message: "Email already verified",
            });
        }

        if (!user.otp || !user.otpExpiresAt) {
            return res.status(400).json({
                message: "OTP not found or expired",
            });
        }

        if (Date.now() > user.otpExpiresAt) {
            return res.status(400).json({
                message: "OTP expired",
            });
        }

        const isOtpValid = await bcrypt.compare(otp, user.otp);
        console.log(isOtpValid)
        if (!isOtpValid) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        user.isEmailVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;

        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            message: "Email verified successfully",
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

//Get users orders to show on frontend 
router.get('/get-all-orders', protect, async (req, res) => {
    try {
        const id = req.user.id;

        const allOrders = await User.findById(id).populate("orders");
        const orders = allOrders.orders

        if (!orders) {
            res.status(400).json({
                message: "Something went wrong"
            })
        }


        res.status(200).json({
            message: "Orders Found ",
            orders
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error"
        })
    }
})

//Get Queries from user
router.get('/get-all-queries', protect, async (req, res) => {
    try {
        const id = req.user.id

        const allQueries = await User.findById(id).populate("queries")
        const queries = allQueries.queries

        if (!queries) {
            res.status(400).json({
                message: "No Query found"
            })
        }

        res.status(200).json({
            message: "Queries Found",
            queries
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error"
        })
    }
})

// Get current user (without sensitive fields)
router.get("/get-current-user", protect, async (req, res) => {
    try {
        const id = req.user.id;

        const foundUser = await User.findById(id).select(
            "-password -__v -createdAt -updatedAt -orders -queries -role -isEmailVerified"
        );

        if (!foundUser) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }

        res.status(200).json({
            message: "User found",
            data: foundUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});



module.exports = router