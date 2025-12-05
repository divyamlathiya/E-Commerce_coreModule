const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODELS.user,
        required: true
    },

    userName: {
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

    address: {
        street: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        country: {
            type: String,
            required: true
        },

        zip: {
            type: String,
            required: true
        }
    },

    items: [
        {
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

            price: {
                type: Number,
                required: true
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ['COD', 'Online'],
        required: true
    },

    upiId: {
    type: String,
    required: false
    },

    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Deliverd', 'Cancelled'],
        default: 'Pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(constant.MODELS.order, orderSchema);
