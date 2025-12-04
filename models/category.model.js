const mongoose = require('mongoose');
const constant = require('../utilities/constant.js');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(constant.MODELS.category, categorySchema);