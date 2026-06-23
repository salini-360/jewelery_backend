const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    email: String,
    address: String,

    items: [
        {
            productId: Number,
            productName: String,
            price: Number,
            quantity: Number
        }
    ],

    totalAmount: Number,

    status: {
        type: String,
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);