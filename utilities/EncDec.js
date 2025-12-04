const crypto = require('crypto-js');
require('dotenv').config();

var encPass = async (password) => {
    var encPass = await crypto.AES.encrypt(password, process.env.CRYPTO_SECRET);
    return encPass.toString();
};

var decPass = async (password) => {
    var decPass = await crypto.AES.decrypt(password, process.env.CRYPTO_SECRET);
    return decPass.toString(crypto.enc.Utf8);
};

module.exports = { encPass, decPass };