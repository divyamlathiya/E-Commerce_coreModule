var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var { decPass } = require('../../utilities/EncDec.js');
var userRegister = require('../../models/userRegister.model.js');

/* GET home page. */
async function deleteUser(req, res, next) {

  const { userName, password } = req.body;

  if (userName) {
    const foundUser = await userRegister.findOne({ name: userName });
    if (foundUser) {
        if (password) {
            const decryptedPassword = await decPass(foundUser.password);
            if (decryptedPassword == password) {
                const deleteUser = await userRegister.deleteOne({ _id: foundUser._id });

                response.onSuccess(res, deleteUser, 'User deleted successfully');
            } else {
                response.onError(res, 'Invalid credentials');
            }
        } else {
            response.onError(res, 'Password field is required');
        }
    } else {
        response.onError(res, 'User not found');
    }
  } else {
    response.onError(res, 'UserName field is required');
  }
  
};

module.exports = deleteUser;
