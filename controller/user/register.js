var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var userRegister = require('../../models/userRegister.model.js');
var { encPass } = require('../../utilities/EncDec.js');

/* GET home page. */
async function registerUser(req, res, next) {

  const { name, email, password, phone, address } = req.body;

  if (name.trim()) {
    if (email.trim()) {
      const existingEmail = await userRegister.findOne({email:email}).lean();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        response.onError(res, 'Email is invalid');
      } else {
      if (!existingEmail) {
        if (password.trim()) {
          if (password.length < 8) {
            response.onError(res, 'Password must be atleast 8 characters');
          } else {
          if (phone.trim()) {
            const existingPhone = await userRegister.findOne({phone:phone}).lean();
            const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){10,12}[0-9]{1}$/;
            if (!phoneRegex.test(phone)) {
              response.onError(res, 'Phone is invalid');
            } else {                 
            if (!existingPhone) {
              if (address) {                
                const encryptedPassword = await encPass(password);
  
                const newUser = new userRegister ({
                name: name,
                email: email,
                password: encryptedPassword,
                phone: phone,
                address: address
              });
              const saveUser = await newUser.save();
              response.onSuccess(res, saveUser, 'Saved');
              } else {
                response.onError(res, 'Address field is required');
              }
            } else {
              response.onError(res, 'Phone is already exists');
            }
          }
          
          } else {
            response.onError(res, 'Phone field is required');
          }
        }
        } else {
          response.onError(res, 'Password field is required');
        }
      } else {
        response.onError(res, 'Email already exists');
      }
    }
    } else {
      response.onError(res, 'Email field is required');
    }
  } else {
    response.onError(res, 'Name field is required');
  }
};

module.exports = registerUser;
