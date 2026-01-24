const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    size: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    email: {
        type: String,
    },

    address: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    pin: {
        type: Number,
        required: true
    },

    note: {
        type: String,
    },

    status: {
        type: String,
        enum: ['not_viewed', 'viewed', 'delivered'],
        default: 'not_viewed'
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)
