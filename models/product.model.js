const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        // ref: constant.MODELS.category,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    inStoke: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(constant.MODELS.product, productSchema);