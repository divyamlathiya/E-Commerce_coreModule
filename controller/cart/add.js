var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var cartAdd = require('../../models/cart.model.js');
var productAdd = require('../../models/product.model.js');
var userRegister = require('../../models/userRegister.model.js');

/* GET home page. */
async function addProduct(req, res) {

  const { userName, productName, quantity } = req.body;

  const qty = Number(quantity);

  if (userName || productName) {
    const foundUser = await userRegister.findById(req.user.userId);
    if (foundUser) {
      const checkLoginUser = await userRegister.findById(req.user.userId);
      if (checkLoginUser) {
      const productData = await productAdd.findOne({ name: productName });
      if (productData) {
        const cartData = await cartAdd.findOne({ userId: foundUser._id, productId: productData._id });
        if (cartData) {
          cartData.quantity += qty;
          cartData.bill = cartData.quantity * productData.price;

          const cartSave = await cartData.save();
          response.onSuccess(res, cartSave, 'Product added');
        } else {
            const newCart = new cartAdd({
              userId: foundUser._id,
              userName: foundUser.name,
              productId: productData._id,
              name: productData.name,
              quantity: qty,
              price: productData.price,
              bill: qty * productData.price
            });
            await newCart.save();
            response.onSuccess(res, newCart, 'Product added');
        }
      } else {
        response.onError(res, 'Product not found');
      }
      } else {
        response.onError(res, 'User not loggin');
      }
    } else {
      response.onError(res, 'User not found');
    }
  } else {
    response.onError(res, 'userName or productName missing');
  }
};

module.exports = addProduct;
