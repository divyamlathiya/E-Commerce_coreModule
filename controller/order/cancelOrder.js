var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var orderRegister = require('../../models/order.model.js');

/* GET home page. */
async function cancelOrder(req, res, next) {

    const { orderId } = req.body;

    const foundOrder = await orderRegister.findById(orderId);
    if (foundOrder) {
        if (foundOrder.status == 'Pending') {
            foundOrder.status = 'Cancelled';
            await foundOrder.save();

            response.onSuccess(res, foundOrder, 'Order cancelled successfully');
        } else {
            response.onError(res, `Order can not cancelled. Current status is ${foundOrder.status}`);
        }
    } else {
        response.onError(res, 'Order not found');
    }

};

module.exports = cancelOrder;
