const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        email: {
            type: String,
            required: true

        },
        phone: {
            type: String,
            required: true

        },
        message: {
            type: String,
            required: true

        },
        status: {
            type: String,
            enum: ["pending", "resolved"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Query", QuerySchema);
