const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const orderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODELS.order,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODELS.product,
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(constant.MODELS.orderItem, orderItemSchema);