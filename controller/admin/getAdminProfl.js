var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var adminRegister = require('../../models/adminRegister.model.js');

/* GET home page. */
async function getAdminProfl(req, res, next) {

    const adminEmail = process.env.adminEmail; 
    
    const foudAdmin = await adminRegister.findOne({ adminEmail: adminEmail }).lean();
    if (foudAdmin) {
        delete foudAdmin.password;

        response.onSuccess(res, foudAdmin, 'Data fatched');
    } else {
        response.onError(res, 'No data found');
    }

};

module.exports = getAdminProfl;
