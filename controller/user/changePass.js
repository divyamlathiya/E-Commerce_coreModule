var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var { encPass, decPass } = require('../../utilities/EncDec.js');
var userRegister = require('../../models/userRegister.model.js');

/* GET home page. */
async function changePassword(req, res, next) {

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (oldPassword) {
    if (newPassword) {
        if (confirmPassword) {
            if (newPassword == confirmPassword) {
                const foundUser = await userRegister.findById(req.user.userId);
                if (foundUser) {
                    const decryptedPassword = await decPass(foundUser.password);

                    if (decryptedPassword == oldPassword) {
                        const encryptedPassword = await encPass(newPassword);
                        foundUser.password = encryptedPassword;

                        await foundUser.save();
                        response.onSuccess(res, null, 'Password changed successfully');
                    } else {
                        response.onError(res, 'OldPassword is incorrect');
                    }
                } else {
                    response.onError(res, 'User not found');
                }
            } else {
                response.onError(res, 'NewPassword and ConfirmPassword is must be same');
            }
        } else {
            response.onError(res, 'ConfirmPassword field is required');
        }
    } else {
        response.onError(res, 'NewPassword field is required');
    }
  } else {
    response.onError(res, 'OldPassword field is required');
  }
  
};

module.exports = changePassword;
