var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var response = require('../../../utilities/responseManager.js');
var resetTokens = require('../../../utilities/resetTokens.js');
var userRegister = require('../../../models/userRegister.model.js');

/* GET home page. */
async function reqForResetPass(req, res, next) {

  const { email } = req.body;

  if (email) {
    const foundUser = await userRegister.findOne({ email: email });
    if (foundUser) {
        const token = crypto.randomBytes(4).toString('hex');
        const expiresAt = Date.now() + 15 * 60 * 1000;

        resetTokens[email] = { token, expiresAt };
        console.log(`Token for reset password is ${email}: ${token}`);

        response.onSuccess(res, null, `Token send to ${email}`);
    } else {
        response.onError(res, 'User not found');
    }
  } else {
    response.onError(res, 'Email field is required');
  }
  
};

module.exports = reqForResetPass;
