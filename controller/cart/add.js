var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var cartAdd = require('../../models/cart.model.js');
var productAdd = require('../../models/product.model.js');
var userRegister = require('../../models/userRegister.model.js');

/* GET home page. */
async function addProduct(req, res) {

  const { userName, productName, quantity } = req.body;

  if (userName || productName) {
    const foundUser = await userRegister.findOne({ name: userName });
    if (foundUser) {
      const checkLoginUser = await userRegister.findById(req.user.userId);
      if (checkLoginUser) {
      const productData = await productAdd.findOne({ name: productName });
      if (productData) {
        const cartData = await cartAdd.findOne({ userId: foundUser._id });
        if (cartData) {
          const itemIndex = cartData.items.findIndex(item => item.productId.toString() === productData._id.toString());

          if (itemIndex > -1) {
            let productItem = cartData.items[itemIndex];
            productItem.quantity += quantity;
            cartData.items[itemIndex] = productItem;
          } else {
            // const product = await productAdd.findOne({ name: productName });
            // if (!productData) {
            //   response.onError(res, 'Product not found');
            // } else {
            cartData.items.push({
              productId: productData._id,
              name: productData.name,
              quantity,
              price: productData.price
            });
            // }
          }
          cartData.bill = cartData.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
          const cartSave = await cartData.save();
          response.onSuccess(res, cartSave, 'Product added');
        } else {
          // const product = await productAdd.findById(productId);
          if (!productData) {
            response.onError(res, 'Product not found');
          } else {
            const newCart = new cartAdd({
              userId: foundUser._id,
              userName: foundUser.name,
              items: [{
                productId: productData._id,
                name: productData.name,
                quantity,
                price: productData.price
              }],
              bill: quantity * productData.price
            });
            await newCart.save();
            response.onSuccess(res, newCart, 'Product added');
          }
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
