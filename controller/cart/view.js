var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var cartRegister = require('../../models/cart.model.js');

/* GET home page. */
async function viewCart(req, res, next) {

  const { userName } = req.body;

  if (userName) {
    const cartData = await cartRegister.find({ userName: userName }).lean();

    if (cartData.length > 0) {
      response.onSuccess(res, cartData, 'Data fatched');
    } else {
      response.onError(res, 'Data not found');
    }
  } else {
    response.onError(res, 'UserName field is required');
  }

};

module.exports = viewCart;
