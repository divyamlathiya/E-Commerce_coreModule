var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var productRegister = require('../../models/product.model.js');

/* GET home page. */
async function updatedProduct(req, res, next) {

  const productData = await productRegister.findOne({name: 'Computer'}).lean();

  if (productData) {
    const updateProductData = await productRegister.findOneAndUpdate({name: 'Computer'}, { $set: {inStoke: 'false'} }).lean();

    if (updateProductData) {
      response.onSuccess(res, updateProductData, 'Record updated');
    } else {
      response.onError(res, 'Record not updated');
    }
  } else {
    response.onError(res, 'No data found');
  }
};

module.exports = updatedProduct;
