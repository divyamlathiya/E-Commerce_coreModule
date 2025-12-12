var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var orderRegister = require('../../models/order.model.js');
var orderItemsRegister = require('../../models/orderItem.model.js');
var userRegister = require('../../models/userRegister.model.js');
var cartRegister = require('../../models/cart.model.js');
var paymentRegister = require('../../models/payment.model.js');

/* GET home page. */
async function createOrder(req, res, next) {

    const { paymentMethod, upiId } = req.body;

    const foundUser = await userRegister.findById(req.user.userId);
    const paymentData = await orderRegister.find({ userId: foundUser._id });

    if (foundUser) {
        const foundCart = await cartRegister.find({ userId: foundUser._id });
        console.log('cart', foundCart)
        if (foundCart && foundCart.length > 0) {
            const shippingAddress = foundUser.address;
            if (shippingAddress) {
                if (paymentMethod && ['COD', 'Online'].includes(paymentMethod)) {
                    const totalAmount = foundCart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
                    if (paymentMethod === 'Online') {
                        if (upiId) {
                            const upiIdRegex = /^[\w.-]+@[\w.-]+$/;
                            if (upiIdRegex.test(upiId)) {
                                const newOrder = new orderRegister({
                                    userId: foundUser._id,
                                    userName: foundUser.name,
                                    address: shippingAddress,
                                    // items: foundCart.map(item => ({
                                    //     productId: item.productId,
                                    //     productName: item.name,
                                    //     quantity: item.quantity,
                                    //     price: item.price
                                    //  })),
                                    totalAmount: totalAmount,
                                    paymentMethod: paymentMethod,
                                    paymentStatus: 'Pending',
                                    upiId: paymentMethod === "Online" ? upiId : null,
                                    orderStatus: 'Pending'
                                });

                                const saveOrder = await newOrder.save();

                                const orderItems = foundCart.map(item => ({
                                    orderId: saveOrder._id,
                                    userName: item.userName,
                                    productId: item.productId,
                                    productName: item.name,
                                    quantity: item.quantity,
                                    price: item.price
                                }));

                                await orderItemsRegister.insertMany(orderItems);

                                const paymentDetails = {
                                    orderId: saveOrder._id,
                                    userId: foundUser._id,
                                    userName: foundUser.name,
                                    paymentMethod: paymentMethod,
                                    paymentStatus: 'pending',
                                    paymentGateway: upiId,
                                    amount: totalAmount
                                };

                                await paymentRegister.create(paymentDetails);

                                // foundCart.items = [];
                                // foundCart.bill = 0;

                                // await foundCart.save();
                                await cartRegister.deleteMany({ userId: foundUser._id});

                                response.onSuccess(res, saveOrder, 'Order placed successfully');
                            } else {
                                response.onError(res, 'UpiId is not valid');
                            }
                        } else {
                            response.onError(res, 'For online payment upiId field is required');
                        }
                    } else {
                        const newOrder = new orderRegister({
                            userId: foundUser._id,
                            userName: foundUser.name,
                            address: shippingAddress,
                            // items: foundCart.map(item => ({
                            //     productId: item.productId,
                            //     productName: item.name,
                            //     quantity: item.quantity,
                            //     price: item.price
                            // })),
                            totalAmount: totalAmount,
                            paymentMethod: paymentMethod,
                            paymentStatus: 'Pending',
                            orderStatus: 'Pending'
                        });

                        const saveOrder = await newOrder.save();

                        const orderItems = foundCart.map(item => ({
                            orderId: saveOrder._id,
                            userName: item.userName,
                            productId: item.productId,
                            productName: item.name,
                            quantity: item.quantity,
                            price: item.price
                        }));

                        await orderItemsRegister.insertMany(orderItems);

                        const paymentDetails = {
                            orderId: saveOrder._id,
                            userId: foundUser._id,
                            userName: foundUser.name,
                            paymentMethod: paymentMethod,
                            paymentStatus: 'Pending',
                            paymentGateway: upiId,
                            amount: totalAmount
                        };

                        await paymentRegister.create(paymentDetails);

                        // foundCart.items = [];
                        // foundCart.bill = 0;
                        // await foundCart.save();
                        await cartRegister.deleteMany({ userId: foundUser._id});

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

