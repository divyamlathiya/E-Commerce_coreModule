const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const paymentSchema = new mongoose.Schema({
    // // transactionId:{
    //     type: String,
    //     required: true,
    //     unique: true
    // },

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODELS.order,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constant.MODELS.user,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    paymentStatus: {
        type: String,
        required: true
    },

    paymentGateway: {
        type: String,
    },

    amount: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(constant.MODELS.payment, paymentSchema);