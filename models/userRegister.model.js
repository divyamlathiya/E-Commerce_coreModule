const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
    },

    phone: {
        type: String,
        required: true,
        unique: true
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

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(constant.MODELS.user, userSchema);
