const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],

    queries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Query"
    }],

    otp: String,

    otpExpiresAt: {
        type: Date,
        index: { expires: 300 }
    },

    isEmailVerified: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)
