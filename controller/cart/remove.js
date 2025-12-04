var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var cartAdd = require('../../models/cart.model.js');

/* GET home page. */
async function removeProduct(req, res, next) {

  const { userName, productName } = req.body;

  if (userName) {
    const foundUser = await cartAdd.findOne({ userName });
    if (foundUser) {      
      if (productName) {
        const cartData = await cartAdd.findOne({ userName });
        if (cartData) {
          const itemIndex = cartData.items.findIndex(item => item.name === productName);
          if (itemIndex > -1) {
            cartData.items.splice(itemIndex, 1);
  
            cartData.bill = cartData.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
            const updateCart = await cartData.save();
            response.onSuccess(res, updateCart, `${productName} removed from cart`);
          } else {
            response.onError(res, 'No item found into your cart');
          }
        } else {
          response.onError(res, `Cart not found for '${userName}' user`);
        }
      } else {
        response.onError(res, 'Product not found');
      }
    } else {
      response.onError(res, 'User not found');
    }
  } else {
    response.onError(res, 'User field is required');
  }

};

module.exports = removeProduct;
