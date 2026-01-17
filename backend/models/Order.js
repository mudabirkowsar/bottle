const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },

    quantity: {
        type: String,
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

    note: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['not_viewed', 'viewed', 'delivered'],
        default: 'not_viewed'
    }
})

module.exports = mongoose.model("Order", orderSchema)