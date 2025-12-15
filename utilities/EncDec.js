const crypto = require('crypto-js');
require('dotenv').config();

const secrt_key = process.env.CRYPTO_SECRET;

var encPass = async (password) => {
    var encPassLayer1 = await crypto.AES.encrypt(password, secrt_key).toString();
    var encPassLayer2 = await crypto.DES.encrypt(encPassLayer1, secrt_key).toString();
    var encPassLayer3 = await crypto.TripleDES.encrypt(encPassLayer2, secrt_key).toString();
    return encPassLayer3;
};

var decPass = async (password) => {
    var decPassLayer3 = await crypto.TripleDES.decrypt(password, secrt_key).toString(crypto.enc.Utf8);
    var decPassLayer2 = await crypto.DES.decrypt(decPassLayer3, secrt_key).toString(crypto.enc.Utf8);
    var decPassLayer1 = await crypto.AES.decrypt(decPassLayer2, secrt_key).toString(crypto.enc.Utf8);
    return decPassLayer1;
};

module.exports = { encPass, decPass };
