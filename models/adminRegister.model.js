const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const adminSchema = new mongoose.Schema({
    adminEmail: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true, 
    },

    adminName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model(constant.MODELS.admin, adminSchema);