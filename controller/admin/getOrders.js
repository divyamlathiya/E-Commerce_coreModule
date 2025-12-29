var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var orderItemRegister = require('../../models/orderItem.model.js');

/* GET home page. */
async function getOrders(req, res, next) {

    const getOrders = await orderItemRegister.find({  });

    if (getOrders) {
        response.onSuccess(res, getOrders, 'Order found');
    } else {
        response.onError(res, 'No order found');
    }

};

module.exports = getOrders;

