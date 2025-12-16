var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var { decPass } = require('../../utilities/EncDec.js');
var jwt = require('jsonwebtoken');
var adminRegister = require('../../models/adminRegister.model.js');

/* GET home page. */
async function adminLogin(req, res, next) {

    const { email, password } = req.body;

    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            const foundAdmin = await adminRegister.findOne({ adminEmail: email }).lean();
            if (foundAdmin) {
                if (password) {
                    console.log('adminPass', foundAdmin.password);
                    const decryptedPassword = await decPass(foundAdmin.password);
                    console.log('decPass', decryptedPassword);
                    if (password == decryptedPassword) {
                        const token = jwt.sign({ adminId: foundAdmin._id, adminEmail: foundAdmin.adminEmail, role: foundAdmin.role }, process.env.JSON_SECRET, { expiresIn: '1h' });

                        delete foundAdmin.password;

                        response.onSuccess(res, { token: token, admin: foundAdmin }, 'Logging in successfully');
                    } else {
                        response.onError(res, 'Invalid credentials');
                    }
                } else {
                    response.onError(res, 'Password field is required');
                }
            } else {
                response.onError(res, 'Email not found');
            }
        } else {
            response.onError(res, 'Email is invalid');
        }
    } else {
        response.onError(res, 'Email field is required');
    }

};

module.exports = adminLogin;
