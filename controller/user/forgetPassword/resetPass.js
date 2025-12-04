var express = require('express');
var router = express.Router();
var response = require('../../../utilities/responseManager.js');
var resetTokens = require('../../../utilities/resetTokens.js');
var { encPass } = require('../../../utilities/EncDec.js');
var userRegister = require('../../../models/userRegister.model.js');

/* GET home page. */
async function reqForResetPass(req, res, next) {

  const { email, token, newPassword, confirmPassword } = req.body;

  if (email) {
    if (token) {
        if (newPassword) {
            if (confirmPassword) {
                if (newPassword == confirmPassword) {
                    const stored = resetTokens[email];
                    if (stored) {
                        if (stored.token == token || stored.expiresAt < Date.now()) {
                            const foundUser = await userRegister.findOne({ email: email });
                            if (foundUser) {
                                const encryptedPassword = await encPass(newPassword);
                                foundUser.password = encryptedPassword;
                                await foundUser.save();

                                delete resetTokens[email];
                                response.onSuccess(res, null, 'Password reset successfully');
                            } else {
                                response.onError(res, 'User not found');
                            }
                        } else {
                            response.onError(res, 'Invalid token or it expires');
                        }
                    } else {
                        response.onError(res, 'No req token is generated');
                    }
                } else {
                    response.onError(res, 'NewPassword and ConfirmPassword must be same');
                }
            } else {
                response.onError(res, 'ConfirmPassword field is required');
            }
        } else {
            response.onError(res, 'NewPassword field is required');
        }
    } else {
        response.onError(res, 'Token field is required');
    }
  } else {
    response.onError(res, 'Email field is required');
  }
  
};

module.exports = reqForResetPass;
