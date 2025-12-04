const mongoose = require('mongoose');

mongoose.createConnection(process.env.MONGO_URI);

module.exports = mongoose;