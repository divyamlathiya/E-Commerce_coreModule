var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var userRegister = require('../../models/userRegister.model.js');


/* GET home page. */
async function updateProfile(req, res, next) {

    const { name, email, phone, address } = req.body;

    if (name) {
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                const foundUser = await userRegister.findOne({ email: email });
                if (foundUser) {
                const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){10,12}[0-9]{1}$/;;
                if (phoneRegex.test(phone)) {
                    if (address && address.street && address.city && address.state && address.country) {

                            foundUser.name =  name;
                            foundUser.email = email;
                            foundUser.phone = phone;
                            foundUser.address = address;

                        const saveUpdatedUser = foundUser.save();
                        response.onSuccess(res, saveUpdatedUser, 'User updated succefully');
                    } else {
                        response.onError(res, 'Address field is required');
                    }
                } else {
                    response.onError(res, 'Phone is invalid');
                }
            
            } else {
                    response.onError(res, 'User not found');
                }
            } else {
                response.onError(res, 'Email is invalid');
            }
        } else {
            response.onError(res, 'Email filed is required');
        }
    } else {
        response.onError(res, 'Name field is required');        
    }


};

module.exports = updateProfile;
