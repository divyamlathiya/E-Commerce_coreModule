var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var orderRegister = require('../../models/order.model.js');
var userRegister = require('../../models/userRegister.model.js');
var cartRegister = require('../../models/cart.model.js');

/* GET home page. */
async function createOrder(req, res, next) {

    const { paymentMethod, upiId } = req.body;

    const foundUser = await userRegister.findById(req.user.userId);

    if (foundUser) {
        const foundCart = await cartRegister.findOne({ userId: foundUser._id });
        if (foundCart && foundCart.items.length > 0) {
            const shippingAddress = foundUser.address;
            if (shippingAddress) {
                if (paymentMethod && ['COD', 'Online'].includes(paymentMethod)) {
                    if (paymentMethod === 'Online') {
                        if (upiId) {
                            const upiIdRegex = /^[\w.-]+@[\w.-]+$/;
                            if (upiIdRegex.test(upiId)) {
                                const newOrder = new orderRegister({
                                    userId: foundUser._id,
                                    userName: foundUser.name,
                                    email: foundUser.email,
                                    phone: foundUser.phone,
                                    address: shippingAddress,
                                    items: foundCart.items.map(item => ({
                                        productId: item.productId,
                                        productName: item.name,
                                        quantity: item.quantity,
                                        price: item.price
                                    })),
                                    totalAmount: foundCart.bill,
                                    paymentMethod: paymentMethod,
                                    upiId: paymentMethod === "Online" ? upiId : null,
                                    status: 'Pending'
                                });

                                const saveOrder = await newOrder.save();

                                foundCart.items = [];
                                foundCart.bill = 0;
                                await foundCart.save();

                                response.onSuccess(res, saveOrder, 'Order placed successfully');
                            } else {
                                response.onError(res, 'UpiId is not valid');
                            }
                        } else {
                            response.onError(res, 'UpiId field is required');
                        }
                    } else {
                        const newOrder = new orderRegister({
                            userId: foundUser._id,
                            userName: foundUser.name,
                            email: foundUser.email,
                            phone: foundUser.phone,
                            address: shippingAddress,
                            items: foundCart.items.map(item => ({
                                productId: item.productId,
                                productName: item.name,
                                quantity: item.quantity,
                                price: item.price
                            })),
                            totalAmount: foundCart.bill,
                            paymentMethod: paymentMethod,
                            status: 'Pending'
                        });

                        const saveOrder = await newOrder.save();

                        foundCart.items = [];
                        foundCart.bill = 0;
                        await foundCart.save();

                        response.onSuccess(res, saveOrder, 'Order placed successfully');
                    }
                } else {
                    response.onError(res, 'Invalid payment method');
                }
            } else {
                response.onError(res, 'Address field is required');
            }
        } else {
            response.onError(res, 'Cart is empty');
        }
    } else {
        response.onError(res, 'User not found');
    }

};

module.exports = createOrder;
