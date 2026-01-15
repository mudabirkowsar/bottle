const express = require('express')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require('../models/User')

const router = express.Router()

router.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existedUser = await User.findOne({ email: email.toLowerCase() });
        if (existedUser) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});


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

        const userMatch = await bcrypt.compare(password, existedUser.password)

        if (!userMatch) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }

        const token = jwt.sign(
            { id: userMatch._id },
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

module.exports = router