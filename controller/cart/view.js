var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var cartRegister = require('../../models/cart.model.js');

/* GET home page. */
async function viewCart(req, res, next) {

  const cartData = await cartRegister.find({ userName: 'test' }).lean();

  if (cartData.length > 0) {
    response.onSuccess(res, cartData, 'Data fatched');
  } else {
    response.onError(res, 'Data not found');
  }

};

module.exports = viewCart;
