var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var orderRegister = require('../../models/order.model.js');

/* GET home page. */
async function getOrderDetails(req, res, next) {

    const getOrderDetails = await orderRegister.find({  });

    if (getOrderDetails) {
        response.onSuccess(res, getOrderDetails, 'Order found');
    } else {
        response.onError(res, 'No order found');
    }

};

module.exports = getOrderDetails;
