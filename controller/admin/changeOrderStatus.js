var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var orderRegister = require('../../models/order.model.js');

/* GET home page. */
async function changeOrderStatus(req, res, next) {

    const { orderId, orderStatus } = req.body;

    if (orderId) {
        const foundOrderData = await orderRegister.findById(orderId);
        if (foundOrderData) {
            if (orderStatus) {
                foundOrderData.orderStatus = orderStatus;
                await foundOrderData.save();

                response.onSuccess(res, foundOrderData, 'OrderStatus changed successfully');
            } else {
                response.onError(res, 'OrderStatus field is requied')
            }
        } else {
            response.onError(res, 'No order found');
        }
    } else {
        response.onError(res, 'OrderId field is required');
    }

};

module.exports = changeOrderStatus;
