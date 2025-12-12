const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODELS.user,
        required: true
    },

    userName: {
        type: String
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODELS.product,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },

    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model(constant.MODELS.cart, cartSchema);
