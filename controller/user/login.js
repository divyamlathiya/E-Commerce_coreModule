var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var userRegister = require('../../models/userRegister.model.js');
var { decPass } = require('../../utilities/EncDec.js');
var jwt = require('jsonwebtoken');

/* GET home page. */
async function userLogin(req, res, next) {

  const { email, phone, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){10,12}[0-9]{1}$/;

  if ((email || phone)) {
    if (!email || (emailRegex.test(email))) {
      if (!phone || (phoneRegex.test(phone))) {
        let foundUser = await userRegister.findOne({ $or: [{ email: email }, { phone: phone }] }).lean();
        if (foundUser) {
          const decryptedPassword = await decPass(foundUser.password);

          if (password !== decryptedPassword) {
            response.onError(res, 'Invalid credentials');
          } else {
            const token = jwt.sign({ userId: foundUser._id, email: foundUser.email, phone: foundUser.phone }, process.env.JSON_SECRET, { expiresIn: '1h' });

            delete foundUser.password;

            response.onSuccess(res, { token: token, user: foundUser }, 'Logging in successfully');
          }
        } else {
          response.onError(res, 'User not found');
        }
      } else {
        response.onError(res, 'Phone is invalid');
      }
    } else {
      response.onError(res, 'Email is invalid');
    }
  } else {
    response.onError(res, 'Provide either email or phone');
  }
};

module.exports = userLogin;
