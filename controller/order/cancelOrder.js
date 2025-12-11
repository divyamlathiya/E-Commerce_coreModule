var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var orderRegister = require('../../models/order.model.js');

/* GET home page. */
async function cancelOrder(req, res, next) {

    const { orderId } = req.body;

    if (orderId) {
        const foundOrder = await orderRegister.findById(orderId);
        if (foundOrder) {
            if (foundOrder.orderStatus == 'Pending') {
                foundOrder.orderStatus = 'Cancelled';
                await foundOrder.save();

                response.onSuccess(res, foundOrder, 'Order cancelled successfully');
            } else {
                response.onError(res, `Order can not cancelled. Current status is ${foundOrder.orderStatus}`);
            }
        } else {
            response.onError(res, 'Order not found');
        }
    } else {
        response.onError(res, 'OrderId field is required');
    }

};

module.exports = cancelOrder;
